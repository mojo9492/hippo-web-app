// import prisma from '../prisma'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    throw new Error('Not implemented')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })