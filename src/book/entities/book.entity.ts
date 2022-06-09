import {ApiProperty} from '@nestjs/swagger';
import {Author} from 'src/author/entities/author.entity';
import {BookShelf} from 'src/book-shelf/entities/book-shelf.entity';
import {Genre} from 'src/genres/entities/genre.entity';
import {WaitingList} from 'src/waiting-list/entities/waiting-list.entity';
import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({nullable: true})
    img_link: string;

    @ApiProperty()
    @Column({nullable: true})
    star: string;

    @ApiProperty()
    @Column({nullable: true})
    description: string;

    @ApiProperty()
    @Column({default: 0})
    state: number;

    @ApiProperty()
    @Column({default: new Date()})
    add_date: Date;

    @ManyToMany(() => Genre, (genre) => genre.books)
    @JoinTable()
    genres: Genre[];

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;

    @ManyToMany(() => BookShelf, (bookShelf) => bookShelf.books)
    @JoinTable()
    book_shelfs: BookShelf[];

    @ManyToMany(() => WaitingList, (waitingList) => waitingList.users)
    @JoinTable()
    waiting_lists: WaitingList[];

    constructor(createBook: Partial<Book>) {
        super();
        this.add_date = new Date();
        this.state = 0;
        Object.assign(this, createBook);
    }
}


