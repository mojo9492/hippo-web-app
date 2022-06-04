import { Request, Response } from 'express'
import CaregiverService from '../services/caregiverService'
import UserService from '../services/userService'

interface IPostCaregiverBody {
    userId: number
}

export default class CaregiverController {
    static async getCaregiverById(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400)
                throw new Error('caregiverId is required')
            }

            const caregiverId = Number(id)
            const response = await CaregiverService.findCaregiverById(caregiverId)
            if (!response) {
                res.status(404)
                throw new Error('no caregiver found')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
                const { message } = error
                res.send({
                    message
                })
            }
        }
    }

    static async postNewCaregiver(req: Request<unknown, unknown, IPostCaregiverBody>, res: Response) {
        try {
            const { userId } = req.body
            const existingUser = await UserService.findUserById(userId)
            if (!existingUser) {
                res.status(404)
                throw new Error('user not found')
            }

            const newCaregiver = await CaregiverService.createNewCaregiver(existingUser.id)
            res.send(newCaregiver)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
                const { message } = error
                res.send({
                    message
                })
            }
        }
    }

    static async patchCaregiver(req: Request, res: Response) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400)
                throw new Error('caregiverId is required')
            }

            const caregiverId = Number(id)
            const response = await CaregiverService.updateCaregiver({
                id: caregiverId,
                userId: 1
            })

            if (!response) {
                res.status(404)
                throw new Error('no caregiver found')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
                const { message } = error
                res.send({
                    message
                })
            }
        }
    }

    static async deleteCaregiver(req: Request<{ id: number }>, res: Response) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400)
                throw new Error('caregiverId is required')
            }

            const caregiverId = Number(id)

            const response = await CaregiverService.deleteCaregiver(caregiverId)
            if (!response) {
                res.status(404)
                throw new Error('no caregiver found')
            }

            res.status(204)
        } catch (error) {
            if (error instanceof Error) {
                console.error(error)
                const { message } = error
                res.send({
                    message
                })
            }
        }
    }
}