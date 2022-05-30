import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import limiter from './config/limit'

import path from 'path'
import home from './routes/home'
import auth from './routes/auth'
import record from './routes/record'
import patient from './routes/patient'

export const staticPath = path.join(__dirname, 'public/views')

const app = express()
// * config
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(express.static(staticPath, { index: false }))

// * routers
app.use(home)
app.use(auth)
app.use(record)
app.use(patient)

export default app
