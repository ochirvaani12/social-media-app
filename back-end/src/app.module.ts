import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comment/comments.module';
import { LikesModule } from './like/likes.module';
import { LoginModule } from './login/login.module';
import { PostsModule } from './post/posts.module';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    PostsModule,
    CommentsModule,
    LikesModule,
    UsersModule,
    LoginModule,
    TypeOrmModule.forRoot({}),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({req}) => ({ headers: req.headers }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
