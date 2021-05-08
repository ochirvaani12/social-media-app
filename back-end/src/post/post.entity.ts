import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Comment } from "src/comment/comment.entity";
import { Like1 } from "src/like/like.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Post {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    postId: string

    @Field()
    @Column()
    userId: string

    @Field()
    @Column()
    description: string

    @Field(() => [Like1], {nullable: true})
    likes?: Like1[]

    @Field(() => [Comment], {nullable: true})
    comments?: Comment[]
    
    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}