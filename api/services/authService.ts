import { User } from "@prisma/client";
import AuthController from "../controllers/authController";
import prisma from "../utils/prisma";

export default class AuthService {
    /**
     * Used to add a new refresh token
     * @param user the corresponding user
     * @param token the user's refresh token
     * @returns the id of the new access token
     */
    static async whitelistRefreshToken(user: User, token: string) {
        const t = await prisma.accessToken.create({
            data: {
                hashedToken: await AuthController.hashToken(token),
                userId: user.id
            }
        })
        return t.id
    }

    static async findRefreshToken(id: string) {
        return await prisma.accessToken.findUnique({
            where: {
                id
            }
        })
    }

    static async deleteRefreshToken(id: string) {
        return await prisma.accessToken.delete({
            where: {
                id
            }
        })
    }

    static async revokeRefreshTokens(userId: number) {
        return await prisma.accessToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        })
    }
}