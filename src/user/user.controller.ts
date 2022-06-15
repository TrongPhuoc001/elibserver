import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Request,
    UseGuards,
    Put,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {LibrarianGuard} from 'src/auth/librarian.guard';
import { BorrowBookDto } from './dto/borrow-book.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get()
    @UseGuards(LibrarianGuard)
    findAll() {
        return this.userService.findAll();
    }

    @Get('/profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return this.userService.getProfile(req.user);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Put('/borrow/:bookId')
    borrow(
        @Param('bookId') bookId: string,
        @Request() req: any,
        @Body() body: BorrowBookDto,
    ) {
        return this.userService.borrow(+bookId, req.user.id, body.end_date);
    }

    @Get('/join-waitlist/:bookId')
    joinWaitlist(@Param('bookId') bookId: string, @Request() req: any) {
        return this.userService.joinWaitlist(+bookId, req.user.id);
    }
}


