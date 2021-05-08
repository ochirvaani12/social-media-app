import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Repository } from "typeorm";
import { LoginInput } from "./dto/create.login.input";
import { Login } from "./login.entity";

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Login) private loginRepository: Repository<Login>,
        private readonly authService: AuthService,
    ) {}

    async register(loginInput: LoginInput): Promise<Login> {
        const login = new Login();
        login.email = loginInput.email;
        login.password = await this.authService.hashPassword(loginInput.password);
        login.token = await this.authService.generateJWT(loginInput.email);
        return await this.loginRepository.save(login);
    }

    async login(loginInput: LoginInput): Promise<Login> {
        const login = await this.loginRepository.findOneOrFail({email: loginInput.email});
        const validation = await this.authService.comparePassword(loginInput.password, login.password);
        if(validation) {
            const getLogin = new Login();
            getLogin.loginId = login.loginId;
            getLogin.email = login.email;
            getLogin.token = await this.authService.generateJWT(login.email);
            return getLogin;
        } else {
            throw new Error('Password or Email is incorrect!')
        }
    }

    async getLoginData(email: string): Promise<Login> {
        const login = await this.loginRepository.findOne({email: email});
        login.token = await this.authService.generateJWT(email);
        return login;
    }
}