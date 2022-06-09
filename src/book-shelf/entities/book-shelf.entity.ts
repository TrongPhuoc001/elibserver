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
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookShelf extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Book, (book) => book.book_shelfs)
    @JoinTable()
    books: Book[];

    @ManyToMany(() => User, (user) => user.book_shelfs)
    @JoinTable()
    users: User[];

    @CreateDateColumn()
    start_date: Date;

    @Column()
    end_date: Date;

    constructor(createBookShelf: Partial<BookShelf>) {
        super();
        Object.assign(this, createBookShelf);
    }
}
