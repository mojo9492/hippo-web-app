import { Request, Response } from 'express'

import prisma from "../../utils/prisma"
export default async function getPosts(req: Request, res: Response) {
    try {
        const response = await prisma.post.findMany()
        if (!response) {
            throw new Error('No posts found.')
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