import express from 'express'
import cors from 'cors'
import getUsers from './routes/getUsers'
import getPosts from './routes/getPosts'
import postUser from './routes/postUser'
import postPost from './routes/postPost'
import deletePost from './routes/deletePost'
import putPost from './routes/putPost'
import getUserByEmail from './routes/getUserByEmail'
import getPostsByUserId from './routes/getPostsByUserId'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/users', getUsers) // * admin, will delete in prod
app.get('/feed', getPosts) // * admin, will delete in prod
app.get('/user/:email', getUserByEmail) // * admin will be replaced by login JWT
app.get('/post/:id', getPostsByUserId) // * admin will be replaced by login JWT

app.post('/user', postUser)
app.post('/post', postPost)

app.put('/post/publish/:id', putPost)

app.delete('/post/:id', deletePost)

app.listen(3000, () =>
    console.log('API server ready at: http://localhost:3000')
)
