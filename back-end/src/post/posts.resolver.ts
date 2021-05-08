import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Comment } from "src/comment/comment.entity";
import { CommentsService } from "src/comment/comments.service";
import { Like1 } from "src/like/like.entity";
import { LikesService } from "src/like/likes.service";
import { CreatePostInput } from "./dto/create.post.input";
import { UpdatePostInput } from "./dto/update.post.input";
import { Post } from "./post.entity";
import { PostsService } from "./posts.service";

@Resolver(() => Post)
export class PostsResolver {
    constructor(
        private readonly postsService: PostsService,
        private readonly likesService: LikesService,
        private readonly commentsService: CommentsService,
    ) {}

    @Query(() => [Post])
    async getPosts() {
        return await this.postsService.getPosts();
    }

    @Query(() => [Post])
    async getPostsByUserId(@Args('userId') userId: string) {
        return await this.postsService.getPostsByUserId(userId);
    }

    @Query(() => Post)
    async getPost(@Args('postId') postId: string) {
        return await this.postsService.getPost(postId);
    }

    @ResolveField(() => [Like1])
    async likes(@Parent() post: Post) {
        return await this.likesService.getLikes(post.postId);
    }

    @ResolveField(() => [Comment])
    async comments(@Parent() post: Post) {
        return await this.commentsService.getComments(post.postId);
    }

    @Mutation(() => Post)
    async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
        return await this.postsService.createPost(createPostInput);
    }

    @Mutation(() => Post)
    async deletePost(@Args('postId') postId: string) {
        return await this.postsService.deletePost(postId);
    }

    @Mutation(() => Post)
    async updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
        return await this.postsService.updatePost(updatePostInput);
    }
}