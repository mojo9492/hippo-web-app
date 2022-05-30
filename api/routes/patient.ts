import { Router } from 'express'
import PatientController from '../controllers/patientController'
import isAuthenticated from '../utils/isAuthenticated'

const router: Router = Router()
const endpoint = '/api/v1'

router.use(isAuthenticated)

router.get(`${endpoint}/caregiver/:id`, PatientController.getPatientsByCaregiverId)
router.get(`${endpoint}/patient/:id`, PatientController.getPatientById)
router.post(`${endpoint}/patient`)

export default router
