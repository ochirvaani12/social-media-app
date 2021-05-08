import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLikeInput } from "./dto/create.like.input";
import { Like1 } from "./like.entity";

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like1) private likeRepository: Repository<Like1>,
    ) {}

    async getLikes(postId: string): Promise<Like1[]> {
        return await this.likeRepository.find({postId: postId});
    }

    async getLike(likeId: string): Promise<Like1> {
        return await this.likeRepository.findOneOrFail({likeId: likeId});
    }

    async createLike(createLikeInput: CreateLikeInput): Promise<Like1> {
        return await this.likeRepository.save(createLikeInput);
    }

    async deleteLike(deleteLikeInput: CreateLikeInput): Promise<Like1> {
        const like = await this.likeRepository.findOne({userId: deleteLikeInput.userId, postId: deleteLikeInput.postId});
        this.likeRepository.remove(like);
        return like;
    }
    async deleteLikes(postId: string): Promise<Like1[]> {
        const likes = await this.likeRepository.find({postId: postId});
        this.likeRepository.remove(likes)
        return likes;
    }
}