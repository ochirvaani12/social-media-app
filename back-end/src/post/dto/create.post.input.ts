import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class CreatePostInput {
    @Field()
    @IsNotEmpty()
    userId: string

    @Field()
    description: string
}