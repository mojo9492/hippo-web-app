import { Router } from 'express'
import PatientController from '../../controllers/patientController'
import isAuthenticated from '../../utils/isAuthenticated'

const router: Router = Router()
const endpoint = '/api/v1/patient'

router.use(isAuthenticated)

router.get(`${endpoint}/caregiver/:id`, PatientController.getPatientsByCaregiverId)
router.get(`${endpoint}/:id`, PatientController.getPatientById)

export default router
