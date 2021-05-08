import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Like1 } from "./like.entity";
import { LikesResolver } from "./likes.resolver";
import { LikesService } from "./likes.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Like1])
    ],
    providers: [LikesResolver, LikesService],
    exports: [LikesService],
})

export class LikesModule {}