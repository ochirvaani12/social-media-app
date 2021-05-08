import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoginModule } from "src/login/login.module";
import { PostsModule } from "src/post/posts.module";
import { User } from "./user.entity";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
    imports: [
        LoginModule,
        PostsModule,
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UsersResolver, UsersService],
    exports: [],
})

export class UsersModule {}