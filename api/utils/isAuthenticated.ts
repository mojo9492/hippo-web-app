import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function isAuthenticated(req: Request, res: Response) {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).send({
            message: 'unauthorized'
        })
    }
    try {
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_SECRET as string)
        // todo implement
        // req.payload = payload
    } catch (error) {
        if (error instanceof Error) {
            res.status(401).send({
                message: 'unauthorized'
            })
            throw error
        }
    }
}