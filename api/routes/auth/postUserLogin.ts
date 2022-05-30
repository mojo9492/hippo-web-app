import { Request, Response, Router } from 'express'
import AuthService from '../../services/authService'
import UserService from '../../services/userService'
import AuthController from '../../controllers/authController'
import { verifyPassword } from '../../utils/hash'

const router: Router = Router()

interface IPostUserBody {
    email: string
    password: string
}

router.post('')
export default async function postUserLogin(req: Request<any, any, IPostUserBody>, res: Response) {
    try {
        const { email, password } = req.body

        const existingUser = await UserService.findUserByEmail(email)
        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const validatePassword = await verifyPassword(existingUser.password, password)
        if (!validatePassword) {
            return res.status(401).json({
                message: 'Invalid password'
            })
        }

        const tokens = AuthController.generateTokens(existingUser)
        const whitelist = await AuthService.whitelistRefreshToken(existingUser, tokens.refreshToken)
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