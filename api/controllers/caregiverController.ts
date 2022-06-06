import { Request, Response } from 'express'
import CaregiverService from '../services/caregiverService'
import UserService from '../services/userService'
import logger from '../utils/logger'

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
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
                res.send({
                    message
                })
            }
        }
    }

    static async getCaregiverByUserId(req: Request<{ userId: number }>, res: Response) {
        try {
            const { userId } = req.params
            if (!userId) {
                res.status(400)
                throw new Error('userId is required')
            }

            const caregiverUserId = Number(userId)
            const response = await CaregiverService.findCaregiverByUserId(caregiverUserId)
            if (!response) {
                res.status(404)
                throw new Error('no caregiver found')
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
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
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
                const { message, name, stack } = error
                logger.error(message, [{ name }, { stack }])
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
            const existingCaregiver = await CaregiverService.findCaregiverById(caregiverId)
            if (!existingCaregiver) {
                res.status(404)
                throw new Error('no caregiver found')
            }

            await CaregiverService.deleteCaregiver(caregiverId)
            res.status(204).send()
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
}