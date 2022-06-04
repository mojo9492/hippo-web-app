import { Router } from 'express'
import PatientController from '../controllers/patientController'
import isAuthenticated from '../utils/isAuthenticated'

const router: Router = Router()
const endpoint = '/api/v1'

router.use(isAuthenticated)
router.get(`${endpoint}/patient/caregiver/:id`, PatientController.getPatientsByCaregiverId)
router.get(`${endpoint}/patient/user/:userId`, PatientController.getPatientByUserId)
router.post(`${endpoint}/patient`, PatientController.postPatient)
router.patch(`${endpoint}/patient/:userId/update`, PatientController.patchPatient)
router.delete(`${endpoint}/patient/:userId`, PatientController.deletePatient)

export default router
