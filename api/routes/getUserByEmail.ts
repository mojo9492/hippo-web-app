import { Request, Response } from 'express'
import prisma from '../prisma'

interface RequestParams {
    email: string
}
export default async function getUserByEmail(req: Request<RequestParams>, res: Response) {
    let response
    try {
        const { email } = req.params
        response = await prisma.user.findUnique({
            where: { email }
        })
        if (!response) {
            throw new Error('No user found by email.' + email)
        }
    } catch (error) {
        if (error instanceof Error) {
            response = error
        }
    }
    res.send(response)
}