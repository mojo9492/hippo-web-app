import express from 'express'
import cors from 'cors'
import getUsers from './routes/getUsers'
import getPosts from './routes/getPosts'
import getPost from './routes/getPost'
import postUser from './routes/postUser'
import postPost from './routes/postPost'
import deletePost from './routes/deletePost'
import putPost from './routes/putPost'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/users', getUsers)
app.get('/feed', getPosts)
app.get('/post/:id', getPost)

app.post('/user', postUser)
app.post('/post', postPost)


app.put('/post/publish/:id', putPost)

app.delete('/post/:id', deletePost)

app.listen(3000, () =>
    console.log('REST API server ready at: http://localhost:3000'),
)