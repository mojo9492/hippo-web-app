import { Router } from "express";
import CaregiverController from "../controllers/caregiverController";
import isAuthenticated from "../utils/isAuthenticated";

const router: Router = Router()
const endpoint = '/api/v1'

router.use(isAuthenticated)
router.get(`${endpoint}/caregiver/:id`, CaregiverController.getCaregiverById)
router.post(`${endpoint}/caregiver`, CaregiverController.postNewCaregiver)
router.patch(`${endpoint}/caregiver/:id/update`, CaregiverController.patchCaregiver)
router.delete(`${endpoint}/caregiver/:id/delete`, CaregiverController.deleteCaregiver)

export default router
