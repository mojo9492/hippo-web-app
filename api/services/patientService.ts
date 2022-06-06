import { Patient } from "@prisma/client";
import prisma from "../config/prisma";

export default class PatientService {
    static async findPatientsByCaregiverId(caregiverId: number) {
        return await prisma.patient.findMany({
            where: {
                caregiverId
            }
        })
    }

    static async findPatientByUserId(userId: number) { // ? does this need to be find Unique?
        return await prisma.patient.findFirst({
            where: {
                userId
            }
        })
    }

    static async createPatient(patient: { userId: number, caregiverId: number }) {
        return await prisma.patient.create({
            data: patient
        })
    }

    static async updatePatient(patient: Patient) {
        return await prisma.patient.update({
            where: {
                id: patient.id
            },
            data: patient
        })
    }

    static async deletePatient(patientId: number) {
        return await prisma.patient.delete({
            where: {
                id: patientId
            }
        })
    }
}