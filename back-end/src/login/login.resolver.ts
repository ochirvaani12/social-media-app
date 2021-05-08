import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { LoginInput } from "./dto/create.login.input";
import { Login } from "./login.entity";
import { LoginService } from "./login.service";

@Resolver(() => Login)
export class LoginResolver {
    constructor(
        private readonly loginService: LoginService,
    ) {}

    @Mutation(() => Login)
    async register(@Args('loginInput') loginInput: LoginInput) {
        return await this.loginService.register(loginInput);
    }

    @Mutation(() => Login)
    async login(@Args('loginInput') loginInput: LoginInput) {
        return await this.loginService.login(loginInput);
    }

    @Query(() => Login)
    async getLoginData(@Args('email') email: string) {
        return await this.loginService.getLoginData(email);
    }
}