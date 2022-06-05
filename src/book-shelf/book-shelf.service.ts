import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateBookShelfDto} from './dto/create-book-shelf.dto';
import {UpdateBookShelfDto} from './dto/update-book-shelf.dto';
import {BookShelf} from './entities/book-shelf.entity';

@Injectable()
export class BookShelfService {
    constructor(
        @InjectRepository(BookShelf)
        private readonly bookShelfRepository: Repository<BookShelf>,
    ) {}
    create(createBookShelfDto: CreateBookShelfDto) {
        return this.bookShelfRepository.save(new BookShelf(createBookShelfDto));
    }

    findAll() {
        return this.bookShelfRepository.find();
    }

    findOne(id: number) {
        return this.bookShelfRepository.findOne(id);
    }

    async update(id: number, updateBookShelfDto: UpdateBookShelfDto) {
        const bookShelf = await this.bookShelfRepository.findOne(id);
        return this.bookShelfRepository.save({
            ...bookShelf,
            ...updateBookShelfDto,
        });
    }

    async remove(id: number) {
        const bookShelf = await this.findOne(id);
        return this.bookShelfRepository.delete(bookShelf);
    }
}
