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
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class WaitingList extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.waiting_lists, {eager: true})
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    create_at: Date;

    constructor(createWaitingList: Partial<WaitingList>) {
        super();
        Object.assign(this, createWaitingList);
    }
}
