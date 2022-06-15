import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BookShelfService} from 'src/book-shelf/book-shelf.service';
import {BookShelf} from 'src/book-shelf/entities/book-shelf.entity';
import {BookService} from 'src/book/book.service';
import {WaitingList} from 'src/waiting-list/entities/waiting-list.entity';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
        private bookShelfService: BookShelfService,
        private bookService: BookService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        const newUser = this.UserRepository.create(createUserDto);
        return this.UserRepository.save(newUser);
    }

    findAll() {
        return this.UserRepository.find({
            relations: ['book_shelfs'],
        });
    }

    findOne(id: number) {
        return this.UserRepository.findOneOrFail({
            where: {
                id,
            },
            relations: ['book_shelfs'],
        });
    }

    findOneUsername(username: string) {
        return this.UserRepository.findOne({
            where: {
                account: username,
            },
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);
        user.name = updateUserDto.name;
        user.phone_number = updateUserDto.phone_number;
        user.address = updateUserDto.address;
        return this.UserRepository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        return this.UserRepository.delete(user);
    }

    async getProfile(user: User) {
        return this.UserRepository.findOne({
            where: {
                id: user.id,
            },
            relations: ['book_shelfs', 'book_shelfs.book'],
        });
    }

    async borrow(bookId: number, userId: number, end_date: Date) {
        const user = await this.findOne(userId);
        const book = await this.bookService.findOne(bookId);
        const book_shelf = await this.bookShelfService.create({
            book,
            end_date,
        });
        user.book_shelfs.push(book_shelf);
        return this.UserRepository.save(user);
    }

    async joinWaitlist(bookId: number, userId: number) {
        const user = await this.findOne(userId);
        return this.bookService.addWaitingList(bookId, user);
    }
}
