import { Request, Response } from 'express'
import prisma from '../../utils/prisma'

interface RequestBody {
    authorId: number
}
export default async function getPostsByUserId(req: Request<any, any, any, RequestBody>, res: Response) {
    try {
        const { authorId } = req.query
        const response = await prisma.post.findMany({
            where: { authorId }
        })
        if (!response) {
            throw new Error('No posts found by user.')
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