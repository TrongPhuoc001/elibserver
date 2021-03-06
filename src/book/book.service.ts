import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AuthorService} from 'src/author/author.service';
import {GenresService} from 'src/genres/genres.service';
import { User } from 'src/user/entities/user.entity';
import {UserService} from 'src/user/user.service';
import {WaitingList} from 'src/waiting-list/entities/waiting-list.entity';
import {WaitingListService} from 'src/waiting-list/waiting-list.service';
import {Not, Repository} from 'typeorm';
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
        private readonly waitingListService: WaitingListService,
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

    findAll(isLib: boolean) {
        const where = {} as any;
        if (!isLib) {
            where.state = Not(2);
        }
        return this.bookRepository.find({
            relations: ['author', 'genres'],
            where,
        });
    }

    findOne(id: number) {
        return this.bookRepository.findOne({
            relations: ['author', 'genres', 'waiting_lists'],
            where: {
                id,
            },
        });
    }

    async update(id: number, updateBookDto: UpdateBookDto) {
        const book = await this.bookRepository.findOne(id);
        return this.bookRepository.save({...book, ...updateBookDto});
    }

    async addWaitingList(id: number, user: User) {
        const book = await this.findOne(id);
        const waitingList = await this.waitingListService.create({user});
        book.waiting_lists.push(waitingList);
        return this.bookRepository.save(book);
    }

    async remove(id: number) {
        const book = await this.findOne(id);
        return this.bookRepository.delete(book);
    }

    async hidden(id: number) {
        const book = await this.findOne(id);
        return this.bookRepository.save({...book, state: 2});
    }

    async show(id: number) {
        const book = await this.findOne(id);
        return this.bookRepository.save({...book, state: 0});
    }
}
