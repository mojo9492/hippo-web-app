import { User } from '.prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import AuthService from '../services/authService'
import UserService from '../services/userService'
import { verifyPassword } from '../utils/hash'
import arong2 from 'argon2'

interface IPostUserBody {
    email: string
    password: string
}

export default class AuthController {
    constructor() {

    }
    static generateToken(user: User) {
        return jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
    }

    static generateRefreshToken(user: User) {
        return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' })
    }

    static generateTokens(user: User) {
        const accessToken = AuthController.generateToken(user)
        const refreshToken = AuthController.generateRefreshToken(user)
        return { accessToken, refreshToken }
    }

    static verifyToken(token: string) {
        return jwt.verify(token, process.env.JWT_SECRET as string)
    }

    async hashToken(token: string): Promise<string> {
        return await argon2.hash(token)
    }

    async verifyPassword(hash: string, password: string) {
        return await argon2.verify(hash, password)
    }


    static async login(req: Request<any, any, IPostUserBody>, res: Response) {
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
}