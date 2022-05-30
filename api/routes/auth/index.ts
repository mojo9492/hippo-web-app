import { Router } from 'express'
import AuthController from '../../controllers/authController'

const router: Router = Router()

router.post('/api/v1/user/login', AuthController.login)
router.post('/api/v1/user/register', AuthController.register)
router.post('/api/v1/refreshToken', AuthController.refreshToken)

export default router
