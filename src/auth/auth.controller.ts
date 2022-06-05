import {Controller, Post, Request} from '@nestjs/common';
import {AuthService} from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Request() req): Promise<any> {
        return this.authService.login(req.body);
    }

    @Post('register')
    async register(@Request() req): Promise<any> {
        return this.authService.register(req.body);
    }
}
