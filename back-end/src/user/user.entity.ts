import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Login } from "src/login/login.entity";
import { Post } from "src/post/post.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    userId: string

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column({unique: true})
    username: string

    @Field()
    @Column({unique: true})
    email: string

    @Field()
    @Column()
    sex: string
    
    @Field(() => Login, {nullable: true})
    login?: Login

    @Field(() => [Post], {nullable: true})
    posts?: Post[]

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}