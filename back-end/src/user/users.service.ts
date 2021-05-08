import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoginInput } from "src/login/dto/create.login.input";
import { LoginService } from "src/login/login.service";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create.user.input";
import { UpdateUserInput } from "./dto/update.user.input";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly loginService: LoginService,
    ) {}

    async getUsers(): Promise<User[]> {
        return await this.userRepository.find({});
    }

    async getUser(userId: string): Promise<User> {
        return await this.userRepository.findOneOrFail({userId: userId});
    }

    async createUser(createUserInput: CreateUserInput): Promise<User> {
        const loginInput = new LoginInput();
        loginInput.email = createUserInput.loginInput.email;
        loginInput.password = createUserInput.loginInput.password;
        delete createUserInput.loginInput
        const user = await this.userRepository.save(createUserInput);
        await this.loginService.register(loginInput);
        return user;
    }

    async deleteUser(userId: string): Promise<User> {
        const user = await this.userRepository.findOneOrFail({userId: userId});
        this.userRepository.remove(user);
        return user;
    }

    async updateUser(updateUserInput: UpdateUserInput): Promise<User> {
        const user = await this.userRepository.findOneOrFail({userId: updateUserInput.userId});
        const updatedUser = this.userRepository.create(updateUserInput);
        return await this.userRepository.save(updatedUser);
    } 
}