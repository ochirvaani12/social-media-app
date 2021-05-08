import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";
import { CreateCommentInput } from "./dto/create.comment.inpu";
import { UpdateCommentInput } from "./dto/update.comment.input";

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ) {}

    async getComments(postId: string): Promise<Comment[]> {
        return await this.commentRepository.find({postId: postId});
    }

    async getComment(commentId: string): Promise<Comment> {
        return await this.commentRepository.findOneOrFail({commentId: commentId});
    }

    async createComment(createCommentInput: CreateCommentInput): Promise<Comment> {
        return await this.commentRepository.save(createCommentInput);
    }

    async deleteComment(commentId: string): Promise<Comment> {
        const comment = await this.commentRepository.findOneOrFail({commentId: commentId});
        this.commentRepository.remove(comment);
        return comment;
    }

    async updateComment(updateCommentInput: UpdateCommentInput): Promise<Comment> {
        const comment = await this.commentRepository.findOneOrFail({commentId: updateCommentInput.commentId})
        comment.comment = updateCommentInput.comment;
        return await this.commentRepository.save(comment);
    }
}