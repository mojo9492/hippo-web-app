import { Request, Response, NextFunction } from 'express'
import UserService from '../services/userService'

export default function checkRole(roles: string[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = res.locals.jwtPayload.userId
            const foundUser = await UserService.findUserById(id)
            if (!foundUser) {
                res.status(401)
                throw new Error('User not found')
            }

            if (roles.indexOf(res.locals.jwtPayload.role) === 0) {
                res.status(401)
                throw new Error('User not authorized')
            }
            
            next()
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
                res.send({
                    message
                })
                throw error
            }
        }
    }
}
