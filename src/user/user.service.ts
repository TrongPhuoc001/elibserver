import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BookShelfService} from 'src/book-shelf/book-shelf.service';
import {Repository} from 'typeorm';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private UserRepository: Repository<User>,
        private bookShelfService: BookShelfService,
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
        console.log(id);
        return this.UserRepository.findOneOrFail({
            where: {
                id,
            },
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
            relations: ['book_shelfs'],
        });
    }
}

