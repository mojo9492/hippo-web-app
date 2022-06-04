import { PatientRecord } from "@prisma/client"
import { Request, Response } from "express"
import RecordService from "../services/recordService"

export default class RecordController {
    static async getByAuthorId(req: Request<{ authorId: number }>, res: Response) {
        try {
            const { authorId } = req.params
            if (!authorId) {
                res.status(400)
                throw new Error('authorId is required')
            }
            const recordAuthorId = Number(authorId)
            const response = await RecordService.findRecordsByAuthorId(recordAuthorId)
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

    static async getByPatientId(req: Request<{ patientId: number }>, res: Response) {
        try {
            const { patientId } = req.params
            if (!patientId) {
                res.status(400)
                throw new Error('patientId is required')
            }

            const recordPatientId = Number(patientId)
            const response = await RecordService.findRecordsByPatientId(recordPatientId)
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

    static async patchRecord(req: Request<{ recordId: string }>, res: Response) {
        try {
            const { recordId } = req.params
            const updatedRecord = req.body
            if (!updatedRecord) {
                res.status(400)
                throw new Error('a post record is required')
            }

            const existingRecord = await RecordService.findRecordById(recordId)
            if (!existingRecord) {
                res.status(404)
                throw new Error('no record found')
            }
            const response = await RecordService.updateRecord(recordId, updatedRecord)
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

    static async deletePost(req: Request<{ recordId: string }>, res: Response) {
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