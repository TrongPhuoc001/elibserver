import 'reflect-metadata';
import {Book} from 'src/book/entities/book.entity';
import {User} from 'src/user/entities/user.entity';
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class WaitingList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Book, (book) => book.waiting_list, {eager: true})
    book: Book;

    @ManyToMany(() => User, (user) => user.waiting_lists, {eager: true})
    users: User[];

    @CreateDateColumn()
    create_at: Date;
}
