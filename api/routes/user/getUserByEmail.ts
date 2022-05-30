import { Request, Response } from 'express'
import prisma from '../../utils/prisma'

interface RequestParams {
    email: string
}
export default async function getUserByEmail(req: Request<RequestParams>, res: Response) {
    try {
        const { email } = req.params
        const response = await prisma.user.findUnique({
            where: { email }
        })
        if (!response) {
            throw new Error('No user found by email.' + email)
        }
        res.send(response)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({
                message: 'something went wrong'
            })
            throw error
        }
    }
}