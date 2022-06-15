import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Put,
    Request,
} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {LibrarianGuard} from 'src/auth/librarian.guard';
import {BookService} from './book.service';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';

@ApiTags('Book')
@ApiBearerAuth()
@Controller('book')
@UseGuards(JwtAuthGuard)
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    @UseGuards(LibrarianGuard)
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.bookService.findAll(req.user.isLibrarian);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(LibrarianGuard)
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(+id, updateBookDto);
    }

    @Delete(':id')
    @UseGuards(LibrarianGuard)
    remove(@Param('id') id: string) {
        return this.bookService.remove(+id);
    }

    @Put('/hidden/:id')
    @UseGuards(LibrarianGuard)
    hidden(@Param('id') id: string) {
        return this.bookService.hidden(+id);
    }

    @Put('/show/:id')
    @UseGuards(LibrarianGuard)
    show(@Param('id') id: string) {
        return this.bookService.show(+id);
    }
}
