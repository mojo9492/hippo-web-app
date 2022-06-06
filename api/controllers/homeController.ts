import { Request, Response } from 'express'
import path from 'path'
import { staticPath } from '../app'
import logger from '../utils/logger'

export default class HomeController {
    static async home(req: Request, res: Response) {
        try {
            res.sendFile(path.join(staticPath, 'index.html'))
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
                res.status(500).send({
                    message: 'something went wrong'
                })
            }
        }
    }
}