import { Post } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../prisma'

export default async function postPost(req: Request, res: Response) {
    let response
    try {
        const { date, bloodPressure, bsl, insulin, insAmount, weight } = req.body as Post
        response = await prisma.post.create({
            data: {
                date, bloodPressure, bsl, insulin, insAmount, weight
            }
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