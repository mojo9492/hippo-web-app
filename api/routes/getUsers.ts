import { Request, Response } from 'express'
import prisma from '../prisma'

export default async function getUsers(req: Request, res: Response) {
    try {
        const response = await prisma.user.findMany()
        if (!response) {
            throw new Error('No users found.')
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