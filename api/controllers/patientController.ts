import { Request, Response } from "express";
import PatientService from "../services/patientService";


interface IPatientsByCaregiverParams {
    caregiverId: number
}

interface IPatentByIdParams {
    patientId: number
}
export default class PatientController {
    static async getPatientsByCaregiverId(req: Request<IPatientsByCaregiverParams>, res: Response) {
        try {
            const { caregiverId } = req.params
            if (!caregiverId) {
                res.status(400)
                throw new Error('caregiverId is required')
            }
    
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
                throw error
            }
        }
    }

    static async getPatientById(req: Request<IPatentByIdParams>, res: Response) {
        try {
            const { patientId } = req.params
            if (!patientId) {
                res.status(400)
                throw new Error('patientId is required')
            }

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
                throw error
            }
        }
    }
}