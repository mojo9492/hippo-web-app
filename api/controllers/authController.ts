import { User } from '.prisma/client'
import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import AuthService from '../services/authService'
import UserService from '../services/userService'
import argon2 from 'argon2'
import logger from '../utils/logger'

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

    static async login(req: Request<unknown, unknown, IUserLoginBody>, res: Response) {
        try {
            const { email, password } = req.body

            const foundUser = await UserService.findUserByEmail(email)
            if (!foundUser) {
                res.status(404)
                throw new Error('user not found')
            }

            const validatePassword = await AuthController.verifyPassword(foundUser.password, password)
            if (!validatePassword) {
                res.status(401)
                throw new Error('invalid password')
            }

            const tokens = AuthController.generateTokens(foundUser)
            await AuthService.whitelistRefreshToken(foundUser.id, tokens.refreshToken)
            return res.send({ tokens, user: foundUser })
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name },{ stack }])
                res.send({
                    message
                })
            }
        }
    }

    static async register(req: Request<unknown, unknown, IUserRegistrationBody>, res: Response) {
        try {
            const { email, last, first, password } = req.body
            if (!email || !password) {
                return res.status(400).send({
                    message: 'email and password are required'
                })
            }

            const existingUser = await UserService.findUserByEmail(email)
            if (existingUser) {
                res.status(400)
                throw new Error('user already exists')
            }

            const user = await UserService.createUser(last, first, email, password)
            const tokens = AuthController.generateTokens(user)
            await AuthService.whitelistRefreshToken(user.id, tokens.refreshToken)
            res.send({ tokens, user })
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name },{ stack }])
                res.send({
                    message: 'something went wrong'
                })
            }
        }
    }

    // ? when do we need to use this?
    static async refreshToken(req: Request<unknown, unknown, IUserRefreshTokenBody>, res: Response) {
        try {
            const { refreshToken } = req.body
            if (!refreshToken) {
                return res.status(400).send({
                    message: 'refreshToken is required'
                })
            }

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

            await AuthService.deleteRefreshToken(payload.jti as string)
            const tokens = AuthController.generateTokens(user)
            await AuthService.whitelistRefreshToken(user.id, tokens.refreshToken)
            return res.send({ tokens })
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name },{ stack }])
                res.send({
                    message: 'something went wrong'
                })
            }
        }
    }
}