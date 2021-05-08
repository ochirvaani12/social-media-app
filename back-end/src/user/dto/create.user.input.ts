import { Field, InputType } from "@nestjs/graphql";
import { IsAlpha, IsEmail, IsNotEmpty, Length } from "class-validator";
import { LoginInput } from "src/login/dto/create.login.input";

@InputType()
export class CreateUserInput {
    @Field()
    @IsAlpha()
    @Length(3, 20)
    firstName: string

    @Field()
    @IsAlpha()
    @Length(3, 20)
    lastName: string

    @Field()
    @IsNotEmpty()
    @Length(3, 20)
    username: string

    @Field()
    @IsEmail()
    email: string

    @Field()
    @IsNotEmpty()
    sex: string

    @Field(() => LoginInput)
    loginInput: LoginInput
}