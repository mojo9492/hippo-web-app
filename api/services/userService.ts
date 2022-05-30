import { User } from "@prisma/client";
import hashToken from "../utils/hash";
import prisma from "../utils/prisma";

export default class UserService {
    static async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email
            }
        })
    }

    static async findUserById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    static async createUser(last: string, first: string, email: string, password: string) {
        const newUser = {
            last,
            first,
            email,
            password: await hashToken(password)
        }
        return prisma.user.create({
            data: newUser
        })
    }
}