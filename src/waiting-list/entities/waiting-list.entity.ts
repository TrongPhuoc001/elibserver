import 'reflect-metadata';
import {Book} from 'src/book/entities/book.entity';
import {User} from 'src/user/entities/user.entity';
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class WaitingList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, (user) => user.waiting_lists, {eager: true})
    @JoinTable()
    users: User[];

    @ManyToMany(() => Book, (book) => book.waiting_lists, {eager: true})
    @JoinTable()
    books: Book[];

    @CreateDateColumn()
    create_at: Date;

    constructor(createWaitingList: Partial<WaitingList>) {
        super();
        Object.assign(this, createWaitingList);
    }
}
