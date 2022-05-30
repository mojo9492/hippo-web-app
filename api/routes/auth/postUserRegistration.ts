import { Request, Response } from 'express'
import UserService from '../../services/userService'
import AuthService from '../../services/authService'
import AuthController from '../../controllers/authController'

interface IPostUserBody {
    email: string
    last: string
    first: string
    password: string
}

export default async function postUserRegistration(req: Request<any, any, IPostUserBody>, res: Response) {
    try {
        const { email, last, first, password } = req.body
        if (!email || !password) {
            return res.status(400).send({
                message: 'email and password are required'
            })
        }

        const existingUser = await UserService.findUserByEmail(email)
        if (existingUser) {
            return res.status(400).send({
                message: 'user already exists'
            })
        }

        const user = await UserService.createUser(last, first, email, password)
        const tokens = AuthController.generateTokens(user)
        const whitelist = await AuthService.whitelistRefreshToken(user, tokens.refreshToken)
        res.send({ tokens, whitelist }) // ? do we need to send the whitelist?
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({
                message: 'something went wrong'
            })
            throw error
        }
    }
}