import {ApiProperty} from '@nestjs/swagger';
import {Book} from 'src/book/entities/book.entity';
import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Genre {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @ManyToMany((_type) => Book, (book) => book.genres)
    books: Book[];
}
