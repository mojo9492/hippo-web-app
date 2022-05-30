import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthService from '../../services/authService'
import UserService from '../../services/userService'
import AuthController from '../../controllers/authController'
import hashToken from '../../utils/hash'
interface IPostUserBody {
    refreshToken: string
}

export default async function postRefreshToken(req: Request<any, any, IPostUserBody>, res: Response) {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return res.status(400).send({
                message: 'refreshToken is required'
            })
        }
        // todo this will probably not work due to the current setup for findRefreshToken
        // todo may need uuidv4 for jti
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload
        const savedRefreshToken = await AuthService.findRefreshToken(payload.jti as string)
        if (!savedRefreshToken || savedRefreshToken.revoked) {
            return res.status(401).send({
                message: 'unauthorized'
            })
        }

        const hashedToken = await hashToken(refreshToken)
        if (hashedToken !== savedRefreshToken.hashedToken) {
            return res.status(401).send({
                message: 'unauthorized'
            })
        }

        const user = await UserService.findUserById(payload.id)
        if (!user) {
            return res.status(401).send({
                message: 'unauthorized'
            })
        }

        const deleteRefreshTokens = await AuthService.deleteRefreshToken(payload.jti as string)
        const tokens = AuthController.generateTokens(user)
        const whitelist = await AuthService.whitelistRefreshToken(user, tokens.refreshToken)
        return res.send({ tokens, whitelist }) // ? do we need to send whitelist?
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({
                message: 'something went wrong'
            })
            throw error
        }
    }
}