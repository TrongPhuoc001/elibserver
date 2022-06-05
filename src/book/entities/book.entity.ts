import {ApiProperty} from '@nestjs/swagger';
import {Author} from 'src/author/entities/author.entity';
import {BookShelf} from 'src/book-shelf/entities/book-shelf.entity';
import {Genre} from 'src/genres/entities/genre.entity';
import {WaitingList} from 'src/waiting-list/entities/waiting-list.entity';
import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    img_link: string;

    @ApiProperty()
    @Column()
    star: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    state: number;

    @ApiProperty()
    @Column()
    add_date: Date;

    @ManyToMany(() => Genre, (genre) => genre.books)
    genres: Genre[];

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;

    @ManyToMany(() => BookShelf, (bookShelf) => bookShelf.books)
    book_shelfs: BookShelf[];

    @OneToOne(() => WaitingList, (waitingList) => waitingList.book)
    @JoinTable()
    waiting_list: WaitingList;
}
