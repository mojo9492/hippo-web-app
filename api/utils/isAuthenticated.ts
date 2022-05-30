import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export default async function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    // todo: delete this log: hit middleware
    console.log('hit middleware')
    
    const token = <string>req.headers['auth']

    let jwtPayload

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET as string)
        res.locals.jwtPayload = jwtPayload
    } catch (error) {
        const message = 'Invalid JWT token'
        res.status(401)
        res.send({
            message
        })
        return
    }

    const { userId, username } = jwtPayload
    const newToken = jwt.sign({ userId, username }, process.env.JWT_SECRET as string, {
        expiresIn: '1h'
    })

    res.setHeader('token', newToken)

    next()
}  