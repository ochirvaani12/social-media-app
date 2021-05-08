import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Login{
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    loginId: string

    @Field()
    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Field()
    token: string
}