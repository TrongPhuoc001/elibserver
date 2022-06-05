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

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Book, (book) => book.book_shelfs)
    @JoinTable()
    books: Book[];

    @CreateDateColumn()
    start_date: Date;

    @Column()
    end_date: Date;

    constructor(createBookShelf: Partial<BookShelf>) {
        super();
        Object.assign(this, createBookShelf);
    }
}
