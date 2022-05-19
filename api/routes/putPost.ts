import { Request, Response } from 'express'
import prisma from '../prisma'

export default async function putPost(req: Request, res: Response) {
    let response
    try {
        // todo implement
        // todo: delete this log: req.body
        console.log('req.body', req.body)
    } catch (error) {
        if (error instanceof Error) {
            response = error
        }
    }
    res.send(response)
}