import { Post } from "@prisma/client";
import prisma from "../utils/prisma";

export default class PostService {
    static async findPostByAuthorId(authorId: number) {
        return await prisma.post.findMany({
            where: { authorId }
        })
    }

    static async createPost(post: Post) {
        return await prisma.post.create({
            data: post
        })
    }

    static async updatePost(id: string, post: Post) {
        return await prisma.post.update({
            where: { id },
            data: post
        })
    }

    static async deletePost(id: string) {
        return await prisma.post.delete({
            where: { id }
        })
    }
}