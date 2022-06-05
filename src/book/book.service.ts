import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthorService} from 'src/author/author.service';
import {GenresService} from 'src/genres/genres.service';
import {Repository} from 'typeorm';
import {CreateBookDto} from './dto/create-book.dto';
import {UpdateBookDto} from './dto/update-book.dto';
import {Book} from './entities/book.entity';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        private readonly genresService: GenresService,
        private readonly authorsService: AuthorService,
    ) {}

    async create(createBookDto: CreateBookDto) {
        const genres = await this.genresService.findOrCreate(
            createBookDto.genres,
        );
        const author = await this.authorsService.findOrCreate(
            createBookDto.author,
        );
        const book = new Book({
            ...createBookDto,
            genres,
            author,
        });
        return this.bookRepository.save(book);
    }

    findAll() {
        return this.bookRepository.find();
    }

    findOne(id: number) {
        return this.bookRepository.findOne(id);
    }

    async update(id: number, updateBookDto: UpdateBookDto) {
        const book = await this.bookRepository.findOne(id);
        return this.bookRepository.save({...book, ...updateBookDto});
    }

    async remove(id: number) {
        const book = await this.findOne(id);
        return this.bookRepository.delete(book);
    }
}
