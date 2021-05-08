import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { CreateLikeInput } from "./dto/create.like.input";
import { Like1 } from "./like.entity";
import { LikesService } from "./likes.service";

@Resolver()
export class LikesResolver {
    constructor(
        private readonly likesService: LikesService,
    ) {}

    @Query(() => [Like1])
    async getLikes(@Args('postId') postId: string) {
        return await this.likesService.getLikes(postId);
    }

    @Query(() => Like1)
    async getLike(@Args('likeId') likeId: string) {
        return await this.likesService.getLike(likeId);
    }

    @Mutation(() => Like1)
    async createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
        return await this.likesService.createLike(createLikeInput);
    }

    @Mutation(() => Like1)
    async deleteLike(@Args('deleteLikeInput') deleteLikeInput: CreateLikeInput) {
        return await this.likesService.deleteLike(deleteLikeInput);
    }
}