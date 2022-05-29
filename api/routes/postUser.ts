import { Request, Response } from 'express'
import { User } from '@prisma/client'
import prisma from '../prisma'

interface IPostUserBody {
    user: User
}

export default async function postUser(req: Request<any, any, IPostUserBody>, res: Response) {
    try {
        const { user } = req.body
        const response = await prisma.user.create({
            data: user,
        })
        if (!response) {
            throw new Error('Could not save entry.')
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