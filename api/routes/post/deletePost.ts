import { Request, Response } from 'express'
import prisma from '../../utils/prisma'

export default async function deletePost(req: Request, res: Response) {
    try {
        const { id } = req.params
        const response = await prisma.post.delete({
            where: { id }
        })
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