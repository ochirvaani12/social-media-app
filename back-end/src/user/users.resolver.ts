import { Resolver, Query, Args, Mutation, ResolveField, Parent } from "@nestjs/graphql";
import { Login } from "src/login/login.entity";
import { LoginService } from "src/login/login.service";
import { Post } from "src/post/post.entity";
import { PostsService } from "src/post/posts.service";
import { CreateUserInput } from "./dto/create.user.input";
import { UpdateUserInput } from "./dto/update.user.input";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        private readonly loginService: LoginService,
        private readonly postsService: PostsService,
    ) {}

    @Query(() => [User])
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Query(() => User)
    async getUser(@Args('userId') userId: string) {
        return await this.usersService.getUser(userId);
    }

    @ResolveField(() => Login)
    async login(@Parent() user: User) {
        return await this.loginService.getLoginData(user.email);
    }

    @ResolveField(() => [Post])
    async posts(@Parent() user: User) {
        return await this.postsService.getPostsByUserId(user.userId);
    }

    @Mutation(() => User)
    async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return await this.usersService.createUser(createUserInput);
    }

    @Mutation(() => User)
    async deleteUser(@Args('userId') userId: string) {
        return await this.usersService.deleteUser(userId);
    }

    @Mutation(() => User)
    async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput){
        return await this.usersService.updateUser(updateUserInput);
    }
}