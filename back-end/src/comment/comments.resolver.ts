import { Args, Resolver, Query, Mutation } from "@nestjs/graphql";
import { Comment } from "./comment.entity";
import { CommentsService } from "./comments.service";
import { CreateCommentInput } from "./dto/create.comment.inpu";
import { UpdateCommentInput } from "./dto/update.comment.input";

@Resolver(() => Comment)
export class CommentsResolver {
    constructor(
        private readonly commentsService: CommentsService,
    ) {}

    @Query(() => [Comment])
    async getComments(@Args('postId') postId: string) {
        return await this.commentsService.getComments(postId);
    }

    @Query(() => Comment)
    async getComment(@Args('commentId') commentId: string) {
        return await this.commentsService.getComment(commentId);
    }

    @Mutation(() => Comment)
    async createComment(@Args('createCommentInput') createCommentInput: CreateCommentInput) {
        return await this.commentsService.createComment(createCommentInput);
    }

    @Mutation(() => Comment)
    async deleteComment(@Args('commentId') commentId: string) {
        return await this.commentsService.deleteComment(commentId);
    }

    @Mutation(() => Comment)
    async updateComment(@Args('updateCommentInput') updateCommentInput: UpdateCommentInput) {
        return await this.commentsService.updateComment(updateCommentInput);
    }
}