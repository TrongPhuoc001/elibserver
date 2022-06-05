import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import {CreateGenreDto} from './dto/create-genre.dto';
import {UpdateGenreDto} from './dto/update-genre.dto';
import {Genre} from './entities/genre.entity';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre)
        private readonly genreRepository: Repository<Genre>,
    ) {}
    create(createGenreDto: CreateGenreDto) {
        return this.genreRepository.save(new Genre(createGenreDto));
    }

    findAll() {
        return this.genreRepository.find();
    }

    findOne(id: number) {
        return this.genreRepository.findOne(id);
    }

    async update(id: number, updateGenreDto: UpdateGenreDto) {
        const genre = await this.genreRepository.findOne(id);
        return this.genreRepository.save({...genre, ...updateGenreDto});
    }

    async remove(id: number) {
        const genre = await this.findOne(id);
        return this.genreRepository.delete(genre);
    }

    async findQuery(where: FindOneOptions<Genre>) {
        const skill = await this.genreRepository.findOne(where);
        return skill;
    }

    async findOrCreate(genres: Genre[]): Promise<Genre[]> {
        const genreList = await Promise.all(
            genres.map(async (genre) => {
                const _genre = await this.findQuery({
                    where: [{id: genre.id}, {name: genre.name}],
                });
                if (_genre) return _genre;

                return this.create({name: genre.name});
            }),
        );
        return genreList.filter(Boolean) as Genre[];
    }
}
