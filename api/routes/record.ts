import { Router } from "express"
import RecordController from "../controllers/recordController"
import isAuthenticated from "../utils/isAuthenticated"

const router: Router = Router()
const endpoint = '/api/v1/record'

router.use(isAuthenticated)
router.post(endpoint, RecordController.postRecord)
router.get(`${endpoint}/author/:authorId`, RecordController.getByAuthorId)
router.get(`${endpoint}/patient/:patientId`, RecordController.getByPatientId)
router.patch(`${endpoint}/:recordId/update`, RecordController.patchRecord)
router.delete(`${endpoint}/:recordId/delete`, RecordController.deleteRecord)

export default router
