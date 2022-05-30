import { User } from '.prisma/client'
import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthService from '../services/authService'
import UserService from '../services/userService'
import argon2 from 'argon2'

interface IUserLoginBody {
    email: string
    password: string
}

interface IUserRegistrationBody {
    email: string
    last: string
    first: string
    password: string
}

interface IUserRefreshTokenBody {
    refreshToken: string
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

    static async hashToken(token: string): Promise<string> {
        return await argon2.hash(token)
    }

    static async verifyPassword(hash: string, password: string) {
        return await argon2.verify(hash, password)
    }

    static async login(req: Request<any, any, IUserLoginBody>, res: Response) {
        try {
            const { email, password } = req.body

            const existingUser = await UserService.findUserByEmail(email)
            if (!existingUser) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            const validatePassword = await AuthController.verifyPassword(existingUser.password, password)
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

    static async register(req: Request<any, any, IUserRegistrationBody>, res: Response) {
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

    static async refreshToken(req: Request<any, any, IUserRefreshTokenBody>, res: Response) {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) {
                return res.status(400).send({
                    message: 'refreshToken is required'
                })
            }
            // todo this will probably not work due to the current setup for findrefreshToken
            // todo may need uuidv4 for jti
            const payload = jwt.verify(refreshToken, process.env.refresh_token_secret as string) as JwtPayload
            const savedRefreshToken = await AuthService.findRefreshToken(payload.jti as string)
            if (!savedRefreshToken || savedRefreshToken.revoked) {
                return res.status(401).send({
                    message: 'unauthorized'
                })
            }

            const hashedToken = await AuthController.hashToken(refreshToken)
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
}