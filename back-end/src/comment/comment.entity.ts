import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Comment {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    commentId: string

    @Field()
    @Column()
    comment: string

    @Field()
    @Column()
    userId: string
    
    @Field()
    @Column()
    postId: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}