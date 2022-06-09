import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateLibrarianDto} from './dto/create-librarian.dto';
import {UpdateLibrarianDto} from './dto/update-librarian.dto';
import {Librarian} from './entities/librarian.entity';

@Injectable()
export class LibrarianService {
    constructor(
        @InjectRepository(Librarian)
        private readonly librarianRepository: Repository<Librarian>,
    ) {}

    create(createLibrarianDto: CreateLibrarianDto) {
        return this.librarianRepository.save(new Librarian(createLibrarianDto));
    }

    findAll() {
        return this.librarianRepository.find();
    }

    findOne(id: number) {
        return this.librarianRepository.findOne(id);
    }

    findOneUsername(username: string) {
        return this.librarianRepository.findOne({
            where: {
                account: username,
            },
        });
    }

    update(id: number, updateLibrarianDto: UpdateLibrarianDto) {
        return this.librarianRepository.update(id, updateLibrarianDto);
    }

    remove(id: number) {
        return this.librarianRepository.delete(id);
    }
}
