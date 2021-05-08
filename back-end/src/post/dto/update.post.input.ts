import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UpdatePostInput {
    @Field(() => ID)
    @IsNotEmpty()
    postId: string

    @Field()
    @IsNotEmpty()
    userId: string

    @Field()
    description: string
}