import { Request, Response } from 'express'
import prisma from '../prisma'

interface RequestBody {
    authorId: number
}
export default async function getPostsByUserId(req: Request<any, any, any, RequestBody>, res: Response) {
    let response
    try {
        const { authorId } = req.query
        response = await prisma.post.findMany({
            where: { authorId }
        })
        if (!response) {
            throw new Error('No posts found by user.')
        }
    } catch (error) {
        if (error instanceof Error) {
            response = error
        }
    }
    res.send(response)
}