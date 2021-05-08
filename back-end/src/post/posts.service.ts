import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePostInput } from "./dto/create.post.input";
import { UpdatePostInput } from "./dto/update.post.input";
import { Post } from "./post.entity";

@Injectable()
export class PostsService {
    constructor( 
        @InjectRepository(Post) private postRepository: Repository<Post>,
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
        this.postRepository.remove(post);
        return post;
    }

    async updatePost(updatePostInput: UpdatePostInput): Promise<Post> {
        const post = await this.postRepository.findOneOrFail({postId: updatePostInput.postId});
        const updatedPost = this.postRepository.create(updatePostInput);
        return await this.postRepository.save(updatedPost);
    }
}