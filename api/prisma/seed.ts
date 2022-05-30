// import prisma from '../prisma'
import { PrismaClient } from '@prisma/client'
import jwt from ''

const prisma = new PrismaClient()
async function main() {

    await prisma.user.create({
        data: {
            last: 'bober',
            first: 'jobi',
            email: 'jobi@boberjoberlabs.com',
            password: 'ball',
            posts: {
                create: {
                    date: new Date(2022, 4, 19, 8),
                    bloodPressure: '',
                    bsl: 215,
                    insulin: '',
                    insAmount: 0,
                    remarks: 'breakfast'
                }
            }
        }
    })

    await prisma.post.create({
        data: {
            date: new Date(2022, 4, 19, 8),
            bloodPressure: '',
            bsl: 215,
            insulin: '',
            insAmount: 0,
            remarks: 'breakfast',
            authorId: 1
        }
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