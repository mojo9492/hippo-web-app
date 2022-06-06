import { PatientRecord } from "@prisma/client";
import prisma from "../config/prisma";

export default class RecordService {

    static async findRecordById(id: string) {
        return await prisma.patientRecord.findUnique({
            where: { id }
        })
    }
    static async findRecordsByPatientId(patientId: number) {
        return await prisma.patientRecord.findMany({
            where: { patientId }
        })
    }

    static async findRecordsByAuthorId(authorId: number) {
        return await prisma.patientRecord.findMany({
            where: { authorId }
        })
    }

    static async createPost(record: PatientRecord) {
        return await prisma.patientRecord.create({
            data: record
        })
    }

    static async updateRecord(id: string, record: PatientRecord) {
        return await prisma.patientRecord.update({
            where: { id },
            data: record
        })
    }

    static async deleteRecord(id: string) {
        return await prisma.patientRecord.delete({
            where: { id }
        })
    }
}