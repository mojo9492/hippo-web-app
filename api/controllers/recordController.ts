import { PatientRecord } from "@prisma/client"
import { Request, Response } from "express"
import RecordService from "../services/recordService"


interface IRecordByUserIdParams {
    authorId: number
}

interface IRecordByPatientIdParams {
    patientId: number
}

export default class RecordController {
    static async getRecordsByUserId(req: Request<IRecordByUserIdParams>, res: Response) {
        try {
            const { authorId } = req.params
            if (!authorId) {
                res.status(400)
                throw new Error('authorId is required')
            }

            const response = await RecordService.findRecordsByAuthorId(authorId)
            if (!response) {
                res.status(404)
                throw new Error('no records found for user')
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

    static async getRecordsByPatientId(req: Request<IRecordByPatientIdParams>, res: Response) {
        try {
            const { patientId } = req.params
            if (!patientId) {
                res.status(400)
                throw new Error('patientId is required')
            }

            const response = await RecordService.findRecordsByPatientId(patientId)
            if (!response) {
                res.status(404)
                throw new Error('no records found for patient')
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

    static async postRecord(req: Request, res: Response) {
        try {
            const newRecord = req.body as PatientRecord
            if (!newRecord) {
                res.status(400)
                throw new Error('a record is required')
            }

            const response = await RecordService.createPost(req.body as PatientRecord)
            if (!response) {
                throw new Error('unable to post record')
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

    static async patchRecord(req: Request, res: Response) {
        try {
            const { id } = req.params
            const foundRecord = req.body as PatientRecord
            if (!foundRecord) {
                res.status(400)
                throw new Error('a post record is required')
            }

            const response = await RecordService.updateRecord(id, foundRecord)
            if (!response) {
                throw new Error('unable to patch record')
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

    static async deletePost(req: Request, res: Response) {
        try {
            const { recordId } = req.params
            const response = await RecordService.deleteRecord(recordId)
            if (!response) {
                res.status(404)
                throw new Error('unable to delete record')
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