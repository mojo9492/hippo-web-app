import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import AuthController from '../controllers/authController'

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        // * when sending headers, make sure to send the correct token (accessToken)
        const header = req.headers.authorization as string
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
            const { message } = error
            res.status(401).send({
                message
            })
            console.error(error)
        }
    }
}  
