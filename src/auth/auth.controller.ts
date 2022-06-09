import {Controller, Post, Request} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Request() req): Promise<any> {
        const userType = req.body.userType;
        if (userType === 0) {
            return this.authService.loginLibrarian(req.body);
        } else {
            return this.authService.login(req.body);
        }
    }

    @Post('register')
    async register(@Request() req): Promise<any> {
        const userType = req.body.userType;
        if (userType === 0) {
            return this.authService.registerLibrarian(req.body);
        } else {
            return this.authService.register(req.body);
        }
    }
}
