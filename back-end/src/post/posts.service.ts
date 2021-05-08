import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentsService } from "src/comment/comments.service";
import { LikesService } from "src/like/likes.service";
import { Repository } from "typeorm";
import { CreatePostInput } from "./dto/create.post.input";
import { UpdatePostInput } from "./dto/update.post.input";
import { Post } from "./post.entity";

@Injectable()
export class PostsService {
    constructor( 
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private readonly likesService: LikesService,
        private readonly commentsService: CommentsService,
    ) {}

    async getPosts(): Promise<Post[]> {
        return await this.postRepository.find({});
    }

    async getPostsByUserId(userId: string): Promise<Post[]> {
        return await this.postRepository.find({userId: userId});
    }

    async getPost(postId: string): Promise<Post> {
        return await this.postRepository.findOneOrFail({postId: postId});
    }

    async createPost(createPostInput: CreatePostInput): Promise<Post> {
        return await this.postRepository.save(createPostInput);
    }

    async deletePost(postId: string): Promise<Post> {
        const post = await this.postRepository.findOneOrFail({postId: postId});
        this.likesService.deleteLikes(post.postId)
        this.commentsService.deleteComments(post.postId)
        this.postRepository.remove(post);
        return post;
    }

    async deletePostsByUserId(userId: string): Promise<Post[]> {
        const posts = await this.postRepository.find({userId: userId});
        posts.forEach(post => this.likesService.deleteLikes(post.postId))
        posts.forEach(post => this.commentsService.deleteComments(post.postId))
        this.postRepository.remove(posts);
        return posts;
    }



    async updatePost(updatePostInput: UpdatePostInput): Promise<Post> {
        const post = await this.postRepository.findOneOrFail({postId: updatePostInput.postId});
        const updatedPost = this.postRepository.create(updatePostInput);
        return await this.postRepository.save(updatedPost);
    }
}