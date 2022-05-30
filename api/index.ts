import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import limiter from './config/limit'
import getUsers from './routes/user/getUsers'

import path from 'path'
import home from './routes/home'
import auth from './routes/auth'
import post from './routes/post'

export const staticPath = path.join(__dirname, 'public/views')

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(express.static(staticPath, { index: false }))
// * routers
app.use(auth)
app.use(post)

// * get
app.get('/', home)
app.get('/api/v1/users', getUsers) // todo admin, will delete in prod

app.listen(3000, () =>
    console.log(`env: ${process.env.NODE_ENV} API server ready at: http://localhost:3000`)
)
