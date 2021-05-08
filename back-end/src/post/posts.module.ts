import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentsModule } from "src/comment/comments.module";
import { LikesModule } from "src/like/likes.module";
import { Post } from "./post.entity";
import { PostsResolver } from "./posts.resolver";
import { PostsService } from "./posts.service";

@Module({
    imports: [
        LikesModule,
        CommentsModule,
        TypeOrmModule.forFeature([Post])
    ],
    providers: [PostsResolver, PostsService],
    exports: [PostsService],
})

export class PostsModule {}