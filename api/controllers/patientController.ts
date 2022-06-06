import { Request, Response } from "express";
import PatientService from "../services/patientService";
import UserService from "../services/userService";
import logger from "../utils/logger";


export default class PatientController {
    static async getPatientsByCaregiverId(req: Request<{ id: number }>, res: Response) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400)
                throw new Error('caregiverId is required')
            }

            const caregiverId = Number(id)

            const response = await PatientService.findPatientsByCaregiverId(caregiverId)
            if (!response) {
                res.status(404)
                throw new Error('no patients found for caregiver')
            }

            const userData = response.map(async (patient) => {
                const patientUser = await UserService.findUserById(patient.userId)
                if (!patientUser) {
                    res.status(404)
                    throw new Error('no user found')
                }
                const { first, last, email } = patientUser
                return {
                    user: {
                        first,
                        last,
                        email
                    },
                    patient: { ...patient }
                }
            })
            const data = await Promise.all(userData)
            res.send(data)
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
                res.send({
                    message
                })
            }
        }
    }

    static async getPatientByUserId(req: Request<{ userId: number }>, res: Response) {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400)
                throw new Error('patientId is required')
            }

            const patientUserId = Number(userId)
            const response = await PatientService.findPatientByUserId(patientUserId)
            if (!response) {
                res.status(404)
                throw new Error('no patient found')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
                res.send({
                    message
                })
            }
        }
    }

    static async postPatient(req: Request<unknown, unknown, { userId: number, caregiverId: number }>, res: Response) {
        try {
            const patient = req.body
            if (!patient) {
                res.status(400)
                throw new Error('patient is required')
            }

            const response = await PatientService.createPatient(patient)
            if (!response) {
                res.status(404)
                throw new Error('no patient found')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
                res.send({
                    message
                })
            }
        }
    }

    static async patchPatient(req: Request<{ userId: number }, unknown, { patient: { userId: number, caregiverId: number } }>, res: Response) {
        try {
            const { userId } = req.params
            const { patient } = req.body
            if (!patient) {
                res.status(400)
                throw new Error('patient is required')
            }

            const existingPatient = await PatientService.findPatientByUserId(userId)
            if (!existingPatient) {
                res.status(404)
                throw new Error('no patient found')
            }

            const updatedPatient = { id: existingPatient.id, ...patient }
            const response = await PatientService.updatePatient(updatedPatient)

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }, { params: req.params }, { body: req.body }])
                res.send({
                    message
                })
            }
        }
    }

    static async deletePatient(req: Request<{ userId: number }, unknown, { userId: number }>, res: Response) {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400)
                throw new Error('patientId is required')
            }

            const existingPatient = await PatientService.findPatientByUserId(userId)
            if (!existingPatient) {
                res.status(404)
                throw new Error('no patient found')
            }

            await PatientService.deletePatient(existingPatient.id)

            res.status(204).send()
        } catch (error) {
            if (error instanceof Error) {
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }, { params: req.params }])
                res.send({
                    message
                })
            }
        }
    }
}