import prisma from "../utils/prisma";

export default class PatientService {
    static async findPatientsByCaregiverId(careGiverId: number) {
        return await prisma.patient.findMany({
            where: {
                careGiverId
            }
        })
    }

    static async findPatientById(patientId: number) {
        return await prisma.patient.findUnique({
            where: {
                id: patientId
            }
        })
    }
}