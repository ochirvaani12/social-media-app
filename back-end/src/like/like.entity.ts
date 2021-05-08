import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Like1 {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    likeId: string

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