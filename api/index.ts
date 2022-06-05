import app from './app'
import logger from './utils/logger'

app.listen(3000, () =>
    logger.info(`env: ${process.env.NODE_ENV} API server ready at: http://localhost:3000`)
)