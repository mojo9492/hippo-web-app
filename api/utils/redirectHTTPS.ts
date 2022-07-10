import { NextFunction, Request, Response } from 'express'
export default function (req: Request, res: Response, next: NextFunction) {
    if (req.secure || (process.env.NODE_ENV === 'development' && !req.secure))  {
        return next()
    }
    res.redirect('https://' + req.headers.host + req.url)
}