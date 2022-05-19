import { Request, Response } from 'express'
import prisma from '../prisma'

export default async function getPost(req: Request, res: Response) {
    let response
    try {
        const { id } = req.params
        response = await prisma.post.findFirst({
            where: { id: id }
        })
    } catch (error) {
        if (error instanceof Error) { response = error }
    }

    res.send(response)
}