import { Request, Response } from 'express'
import prisma from '../prisma'

export default async function getUsers(req: Request, res: Response) {
    let response
    try {
        response = await prisma.user.findMany()
        if (!response) {
            throw new Error('No users found.')
        }
    } catch (error) {
        if (error instanceof Error) {
            response = error
        }
    }
    res.send(response)
}