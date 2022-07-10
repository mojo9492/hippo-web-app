import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import AuthController from '../controllers/authController'
import logger from './logger'

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.path === '/api/v1/user/login' || req.path === '/api/v1/register') {
            logger.info('login or register request')
            return next()
        }
        // * when sending headers, make sure to send the correct token (accessToken)
        const header = req.headers.authorization as string
        if (!header) {
            res.status(401)
            throw new Error('unauthorized')
        }
        const token = header.split(' ')[1]
        if (!token) {
            res.status(401)
            throw new Error('unauthorized')
        }

        const payload = AuthController.verifyToken(token) as JwtPayload

        res.locals.jwtPayload = payload

        const newToken = AuthController.generateRefreshToken(payload.userId)

        res.setHeader('token', newToken)
        next()
    } catch (error) {
        if (error instanceof Error) {
            const { message, name, stack } = error
            logger.error(message, [{ name }, { stack }])
            res.status(401).send({
                message: 'unauthorized'
            })
        }
    }
}  
