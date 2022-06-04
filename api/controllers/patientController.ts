import { Request, Response } from "express";
import PatientService from "../services/patientService";


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

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
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
                const { message } = error
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
                const { message } = error
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
            console.log("🚀 ~ file: patientController.ts ~ line 101 ~ PatientController ~ patchPatient ~ response", response)

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
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

            const response = await PatientService.deletePatient(existingPatient.id)
            if (!response) {
                res.status(404)
                throw new Error('no patient found')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
                res.send({
                    message
                })
            }
        }
    }
}