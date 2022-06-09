import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
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
    findAll() {
        return this.bookService.findAll();
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
}
