import { Router } from 'express'
import HomeController from '../controllers/homeController'

const router: Router = Router()

router.get('/', HomeController.home)

export default router
