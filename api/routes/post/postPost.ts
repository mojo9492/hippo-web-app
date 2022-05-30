import { Post } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../../utils/prisma'

export default async function postPost(req: Request, res: Response) {
    try {
        const { date, bloodPressure, bsl, insulin, insAmount, weight, remarks, authorId } = req.body as Post
        const response = await prisma.post.create({
            data: {
                date, bloodPressure, bsl, insulin, insAmount, weight, remarks, authorId
            }
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
        }
    }
}