import { Request, Response } from 'express'

export default async function putPost(req: Request, res: Response) {
    try {
        // todo implement
        // todo: delete this log: req.body
        console.log('req.body', req.body)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({
                message: 'something went wrong'
            })
            throw error
        }
    }
}