import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import getUsers from './routes/getUsers'
import getPosts from './routes/getPosts'
import postUser from './routes/postUser'
import postPost from './routes/postPost'
import deletePost from './routes/deletePost'
import putPost from './routes/putPost'
import getUserByEmail from './routes/getUserByEmail'
import getPostsByUserId from './routes/getPostsByUserId'
import path from 'path'
import home from './routes/home'

const app = express()
app.use(helmet())
app.use(express.json())
app.use(cors())

export const staticPath = path.join(__dirname, 'public/views')

app.use(express.static(staticPath, { index: false }))

app.get('/', home)
app.get('/api/v1/users', getUsers) // * admin, will delete in prod
app.get('/api/v1/feed', getPosts) // * admin, will delete in prod
app.get('/api/v1/user/:email', getUserByEmail) // * admin will be replaced by login JWT
app.get('/api/v1/post/:id', getPostsByUserId) // * admin will be replaced by login JWT

app.post('/api/v1/user', postUser)
app.post('/api/v1/post', postPost)

app.put('/api/v1/post/publish/:id', putPost)

app.delete('/api/v1/post/:id', deletePost)

app.listen(3000, () =>
    console.log('API server ready at: http://localhost:3000')
)
