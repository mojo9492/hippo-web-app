import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import limiter from './config/limit'

import path from 'path'
import home from './routes/home'
import auth from './routes/auth'
import caregiver from './routes/caregiver'
import patient from './routes/patient'
import record from './routes/record'
import redirectHTTPS from './utils/redirectHTTPS'

export const staticPath = path.join(__dirname, 'public/views')

const app = express()
// * config
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(express.static(staticPath, { index: false }))
app.use(redirectHTTPS)
app.set('trust proxy', 'loopback')

// * routers
app.use(home)
app.use(auth)
app.use(caregiver)
app.use(patient)
app.use(record)

export default app
