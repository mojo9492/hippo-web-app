import AuthController from "../controllers/authController";
import prisma from "../config/prisma";

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
            password: await AuthController.hashToken(password)
        }
        return prisma.user.create({
            data: newUser
        })
    }
}