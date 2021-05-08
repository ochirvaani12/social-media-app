import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateLikeInput {
    @Field()
    userId: string

    @Field()
    postId: string
}