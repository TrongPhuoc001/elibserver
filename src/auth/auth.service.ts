import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {CreateLibrarianDto} from 'src/librarian/dto/create-librarian.dto';
import {Librarian} from 'src/librarian/entities/librarian.entity';
import {LibrarianService} from 'src/librarian/librarian.service';
import {CreateUserDto} from 'src/user/dto/create-user.dto';
import {User} from 'src/user/entities/user.entity';
import {UserService} from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private librarianService: LibrarianService,
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

    async validateLibrarian(username: string, pass: string): Promise<any> {
        const user = await this.librarianService.findOneUsername(username);
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
        const validUser = await this.validateUser(user.account, user.password);
        if (!validUser) {
            throw new UnauthorizedException(
                'No user with account ' + user.account,
            );
        }
        const payload = {username: validUser.account, sub: validUser.id};
        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }

    async loginLibrarian(lib: Librarian) {
        const validLib = await this.validateLibrarian(
            lib.account,
            lib.password,
        );
        if (!validLib) {
            throw new UnauthorizedException(
                'No user with account ' + lib.account,
            );
        }
        const payload = {username: validLib.account, sub: validLib.id};
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
        } else {
            const newUser = await this.userService.create(user);
            return this.userService.findOne(newUser.id);
        }
    }

    async registerLibrarian(user: CreateLibrarianDto) {
        const userC = await this.librarianService.findOneUsername(user.account);
        if (userC) {
            return new UnauthorizedException('Account already exists');
        } else {
            const newUser = await this.librarianService.create(user);
            return this.librarianService.findOne(newUser.id);
        }
    }
}
