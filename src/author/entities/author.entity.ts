import {ApiProperty} from '@nestjs/swagger';
import {Book} from 'src/book/entities/book.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Author {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
