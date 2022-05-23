import { Request, Response } from 'express'
import path from 'path'
import { staticPath } from '..'

export default async function home(req: Request, res: Response) {
    try {
        res.sendFile(path.join(staticPath, 'index.html'))
    } catch (error) {
        if (error instanceof Error) { 
            res.status(500).send(error)
        }
    }
}