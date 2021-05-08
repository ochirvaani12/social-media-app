import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateCommentInput {
    @Field()
    commentId: string

    @Field()
    comment: string
}