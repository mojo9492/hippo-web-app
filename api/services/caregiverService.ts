import prisma from "../config/prisma";
import { Caregiver } from "@prisma/client";

export default class CaregiverService {
    static async findCaregiverById(id: number) {
        return await prisma.caregiver.findUnique({ where: { id } })
    }

    static async createNewCaregiver(userId: number) {
        return await prisma.caregiver.create({
            data: {
                userId
            }
        })
    }

    static async updateCaregiver(caregiver: Caregiver) {
        return await prisma.caregiver.update({
            where: {
                id: caregiver.id
            },
            data: {
                userId: caregiver.userId
            }
        })
    }

    static async deleteCaregiver(id: number) {
        return await prisma.caregiver.delete({
            where: {
                id
            }
        })
    }
}