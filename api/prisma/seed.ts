// import prisma from '../prisma'
import { PrismaClient } from '@prisma/client'
import AuthController from '../controllers/authController'

const prisma = new PrismaClient()
async function main() {
    await prisma.user.createMany({
        data: [
            {
                last: 'bober',
                first: 'jobi',
                email: 'jobi@boberjoberlabs.com',
                password: await AuthController.hashToken('ball'),
            },
            {
                last: 'bean',
                first: 'bean',
                email: 'xena@boberjoberlabs.com',
                password: await AuthController.hashToken('prettygorl'),
            },
            {
                last: 'geetsen',
                first: 'geeter',
                email: 'geeter@boberjoberlabs.com',
                password: await AuthController.hashToken('woo-woo')
            }
        ]
    })

    await prisma.caregiver.create({
        data: { userId: 1 }
    })

    await prisma.patient.createMany({
        data: [
            {
                userId: 2,
                caregiverId: 1
            },
            {
                userId: 3,
                caregiverId: 1
            }
        ]
    })

    await prisma.patientRecord.createMany({
        data: [
            {
                authorId: 1,
                patientId: 1,
                date: new Date(2022, 0, 1, 8, 30),
                bsl: 200,
                insulin: 'novaLOG',
                insAmount: 4,
                remarks: 'breakfast'
            },
            {
                authorId: 1,
                patientId: 2,
                date: new Date(2022, 0, 1, 9),
                bloodPressure: '120/90',
            },
            {
                authorId: 2,
                patientId: 2,
                date: new Date(2022, 0, 1, 10),
                bsl: 210,
                insulin: 'novaLOG',
                insAmount: 4,
                remarks: 'brunch'
            }
        ]
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })