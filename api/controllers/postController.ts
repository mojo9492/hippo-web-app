import { Post } from "@prisma/client"
import { Request, Response } from "express"
import PostService from "../services/postService"
import prisma from "../utils/prisma"


interface IPostByUserIdBody {
    authorId: number
}
export default class PostController {
    static async getPostsByUserId(req: Request<any, any, any, IPostByUserIdBody>, res: Response) {
        try {
            const { authorId } = req.query
            if (!authorId) {
                res.status(400)
                throw new Error('authorId is required')
            }

            const response = await PostService.findPostByAuthorId(authorId)
            if (!response) {
                res.status(404)
                throw new Error('No posts found by user.')
            }
            
            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
                res.send({
                    message
                })
                throw error
            }
        }
    }

    static async postPost(req: Request, res: Response) {
        try {
            const newPost = req.body as Post
            if (!newPost) {
                res.status(400)
                throw new Error('a post record is required')
            }

            const response = await PostService.createPost(req.body as Post)
            if (!response) {
                throw new Error('unable to create post')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
                res.send({
                    message
                })
                throw error
            }
        }
    }
    static async patchPost(req: Request, res: Response) {
        try {
            const { id } = req.params
            const post = req.body as Post
            if (!post) {
                res.status(400)
                throw new Error('a post record is required')
            }

            const response = await PostService.updatePost(id, post)
            if (!response) {
                throw new Error('unable to update post')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
                res.send({
                    message
                })
                throw error
            }
        }
    }
    static async deletePost(req: Request, res: Response) {
        try {
            const { id } = req.params
            const response = await PostService.deletePost(id)
            if (!response) {
                res.status(404)
                throw new Error('unable to delete post')
            }

            res.send(response)
        } catch (error) {
            if (error instanceof Error) {
                const { message } = error
                res.send({
                    message
                })
                throw error
            }
        }
    }
}