import { Router } from "express";
import CaregiverController from "../controllers/caregiverController";
import isAuthenticated from "../utils/isAuthenticated";

const router: Router = Router()
const endpoint = '/api/v1/caregiver'

router.use(isAuthenticated)
router.get(`${endpoint}/:id`, CaregiverController.getCaregiverById)
router.get(`${endpoint}/user/:userId`, CaregiverController.getCaregiverByUserId)
router.post(endpoint, CaregiverController.postNewCaregiver)
router.patch(`${endpoint}/:id/update`, CaregiverController.patchCaregiver)
router.delete(`${endpoint}/:id/delete`, CaregiverController.deleteCaregiver)

export default router
