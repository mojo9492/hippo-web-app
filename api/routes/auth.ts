import { Router } from 'express'
import AuthController from '../controllers/authController'

const router: Router = Router()
const endpoint = '/api/v1'

router.post(`${endpoint}/user/login`, AuthController.login)
router.post(`${endpoint}/register`, AuthController.register)
router.post(`${endpoint}/refreshToken`, AuthController.refreshToken)

export default router
