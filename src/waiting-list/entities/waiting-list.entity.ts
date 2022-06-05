import 'reflect-metadata';
import {Book} from 'src/book/entities/book.entity';
import {User} from 'src/user/entities/user.entity';
import {
    BaseEntity,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class WaitingList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Book)
    @JoinColumn()
    book: Book;

    @ManyToMany(() => User, (user) => user.waiting_lists, {eager: true})
    @JoinTable()
    users: User[];

    @CreateDateColumn()
    create_at: Date;

    constructor(createWaitingList: Partial<WaitingList>) {
        super();
        Object.assign(this, createWaitingList);
    }
}
