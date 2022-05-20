import { Request, Response } from 'express'
import { User } from '@prisma/client'
import prisma from '../prisma'

interface IPostUserBody {
    user: User
}

export default async function postUser(req: Request<any, any, IPostUserBody>, res: Response) {
    let response
    try {
        const { user } = req.body
        response = await prisma.user.create({
            data: user,
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