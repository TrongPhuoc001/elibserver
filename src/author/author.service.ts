import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateAuthorDto} from './dto/create-author.dto';
import {UpdateAuthorDto} from './dto/update-author.dto';
import {Author} from './entities/author.entity';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private readonly authorRepository: Repository<Author>,
    ) {}
    create(createAuthorDto: CreateAuthorDto) {
        return this.authorRepository.save(new Author(createAuthorDto));
    }

    findAll() {
        return this.authorRepository.find();
    }

    findOne(id: number) {
        return this.authorRepository.findOne(id);
    }

    async update(id: number, updateAuthorDto: UpdateAuthorDto) {
        return this.authorRepository.update(id, updateAuthorDto);
    }

    async remove(id: number) {
        const author = await this.findOne(id);
        return this.authorRepository.remove(author);
    }

    async findQuery(query: any) {
        return this.authorRepository.findOne(query);
    }

    async findOrCreate(author: Author): Promise<Author> {
        const _author = await this.findQuery({
            where: {id: author.id, name: author.name},
        });
        if (_author) return _author;
        return this.create(author);
    }
}
