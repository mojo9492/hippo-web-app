import app from './app'

app.listen(3000, () =>
    console.log(`env: ${process.env.NODE_ENV} API server ready at: http://localhost:3000`)
)