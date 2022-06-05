import {Book} from 'src/book/entities/book.entity';
import {User} from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BookShelf {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.book_shelf)
    user: User;

    @ManyToMany(() => Book, (book) => book.book_shelfs)
    books: Book[];

    @CreateDateColumn()
    start_date: Date;

    @Column()
    end_date: Date;
}
