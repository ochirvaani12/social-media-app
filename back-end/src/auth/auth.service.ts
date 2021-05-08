import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async generateJWT(email: string): Promise<string>{
        const user = await this.getUserByEmail(email);
        const token = this.jwtService.sign({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            sex: user.sex,
        });
        return token;
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOneOrFail({email: email});
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async comparePassword(newPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(newPassword, hashedPassword);
    }
}