import {Book} from 'src/book/entities/book.entity';
import {User} from 'src/user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookShelf extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Book, (book) => book.book_shelfs)
    @JoinColumn()
    book: Book;

    @CreateDateColumn()
    start_date: Date;

    @Column()
    end_date: Date;

    constructor(createBookShelf: Partial<BookShelf>) {
        super();
        Object.assign(this, createBookShelf);
    }
}
