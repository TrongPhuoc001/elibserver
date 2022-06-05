import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {CreateUserDto} from 'src/user/dto/create-user.dto';
import {User} from 'src/user/entities/user.entity';
import {UserService} from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneUsername(username);
        if (user) {
            const match = await user.checkPassword(pass);
            if (match) {
                const {password, ...result} = user;
                return result;
            } else {
                return new UnauthorizedException();
            }
        }
        return null;
    }

    async login(user: User) {
        const payload = {username: user.account, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }

    async register(user: CreateUserDto) {
        const userC = await this.userService.findOneUsername(user.account);
        if (userC) {
            return new UnauthorizedException('Account already exists');
        }
        else{
            const newUser = await this.userService.create(user);
            return this.userService.findOne(newUser.id);
        }
        
    }
}
