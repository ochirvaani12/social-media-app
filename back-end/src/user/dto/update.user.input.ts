import { Field, ID, InputType } from "@nestjs/graphql";
import { IsAlpha, IsEmail, IsNotEmpty, Length } from "class-validator";

@InputType()
export class UpdateUserInput {
    @Field(() => ID)
    @IsNotEmpty()
    userId: string

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
}