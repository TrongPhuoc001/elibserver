import {Body, Controller, Post, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {LoginDto} from './dto/login.dto';
import {RegisterDto} from './dto/register.dto';
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<any> {
        const userType = loginDto.userType;
        if (userType === 0) {
            return this.authService.loginLibrarian(loginDto);
        } else {
            return this.authService.login(loginDto);
        }
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto): Promise<any> {
        const userType = registerDto.userType;
        if (userType === 0) {
            return this.authService.registerLibrarian(registerDto);
        } else {
            return this.authService.register(registerDto);
        }
    }
}
