import { Router } from "express"
import RecordController from "../controllers/recordController"
import isAuthenticated from "../utils/isAuthenticated"

const router: Router = Router()
const endpoint = '/api/v1/record'

router.use(isAuthenticated)

router.get(`${endpoint}/:id([0-9]+)`, RecordController.getRecordsByUserId)
router.post(endpoint, RecordController.postRecord)
router.patch(`${endpoint}/:id`, RecordController.patchRecord)
router.delete(`${endpoint}/:id`, RecordController.deletePost)

export default router
