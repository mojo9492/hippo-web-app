import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import limiter from './config/limit'
import getUsers from './routes/user/getUsers'
import getPosts from './routes/post/getPosts'
import postPost from './routes/post/postPost'
import deletePost from './routes/post/deletePost'
import putPost from './routes/post/putPost'
import getUserByEmail from './routes/user/getUserByEmail'
import getPostsByUserId from './routes/post/getPostsByUserId'
import path from 'path'
import home from './routes/home'
import auth from './routes/auth'

export const staticPath = path.join(__dirname, 'public/views')

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(express.static(staticPath, { index: false }))
app.use(auth)

// * get
app.get('/', home)
app.get('/api/v1/users', getUsers) // todo admin, will delete in prod
app.get('/api/v1/feed', getPosts) // todo will delete in prod
app.get('/api/v1/user/:email', getUserByEmail) // todo admin will be replaced by login JWT
app.get('/api/v1/post/:id', getPostsByUserId) // todo admin will be replaced privelaged JWT
// * post
// app.post('/api/v1/user/register', postUserRegistration) // todo delete @feature/auth
// app.post('/api/v1/user/login', postUserLogin) // todo will delete in prod
// app.post('/api/v1/refreshToken') // todo delete
app.post('/api/v1/post', postPost)
// * put
app.put('/api/v1/post/publish/:id', putPost)
// * delete
app.delete('/api/v1/post/:id', deletePost)

app.listen(3000, () =>
    console.log(`env: ${process.env.NODE_ENV} API server ready at: http://localhost:3000`)
)
