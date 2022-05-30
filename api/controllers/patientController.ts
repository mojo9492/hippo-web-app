import { Request, Response } from "express";
import PatientService from "../services/patientService";


interface IParams {
    id: number
}

export default class PatientController {
    static async getPatientsByCaregiverId(req: Request<IParams>, res: Response) {
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

    static async getPatientById(req: Request<IParams>, res: Response) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400)
                throw new Error('patientId is required')
            }

            const patientId = Number(id)
            const response = await PatientService.findPatientById(patientId)
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