import { Router } from "express"
import PostController from "../../controllers/postController"

const router: Router = Router()

router.get('/api/v1/post/:id', PostController.getPostsByUserId)
router.post('/api/v1/post', PostController.postPost)
router.patch('/api/v1/post/:id', PostController.patchPost)
router.delete('/api/v1/post/:id', PostController.deletePost)

export default router
