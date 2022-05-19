import { Request, Response } from 'express'
import prisma from '../prisma'

export default async function postUser(req: Request, res: Response) {
    let response
    try {
        response = await prisma.user.create({
            data: { ...req.body },
        })
        if (!response) {
            throw new Error('Could not save entry.')
        }
    } catch (error) {
        if (error instanceof Error) {
            response = error
        }
    }

    res.send(response)
}