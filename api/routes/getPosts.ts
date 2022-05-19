import { Request, Response } from 'express'

import prisma from "../prisma"
export default async function getPosts(req: Request, res: Response) {
    let response
    try {
        response = await prisma.post.findMany()
        if (!response) {
            throw new Error('No posts found.')
        }
    } catch (error) {
        if (error instanceof Error) {
            response = error
        }
    }

    res.send(response)
}