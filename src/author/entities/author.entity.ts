import {ApiProperty} from '@nestjs/swagger';
import {Book} from 'src/book/entities/book.entity';
import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Author extends BaseEntity {
    constructor(createAuthor: Partial<Author>) {
        super();
        Object.assign(this, createAuthor);
    }
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
