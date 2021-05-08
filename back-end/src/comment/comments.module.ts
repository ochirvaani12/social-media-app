import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { CommentsResolver } from "./comments.resolver";
import { CommentsService } from "./comments.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment])
    ],
    providers: [CommentsResolver, CommentsService],
    exports: [CommentsService],
})

export class CommentsModule {}