import {ApiProperty} from '@nestjs/swagger';
import {Book} from 'src/book/entities/book.entity';
import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genre extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @ManyToMany((_type) => Book, (book) => book.genres)
    books: Book[];

    constructor(createGenre: Partial<Genre>) {
        super();
        Object.assign(this, createGenre);
    }
}
