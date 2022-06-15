import {ApiProperty} from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {BookShelf} from 'src/book-shelf/entities/book-shelf.entity';
import {WaitingList} from 'src/waiting-list/entities/waiting-list.entity';
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    account: string;

    @ApiProperty()
    @Column()
    password: string;

    @ApiProperty()
    @Column()
    phone_number: string;

    @ApiProperty()
    @Column()
    gender: string;

    @ApiProperty()
    @Column()
    address: string;

    @ApiProperty()
    @Column({default: false})
    is_ban: boolean;

    @OneToMany(() => WaitingList, (waitingList) => waitingList.user)
    waiting_lists: WaitingList[];

    @ManyToMany(() => BookShelf)
    @JoinTable()
    book_shelfs: BookShelf[];

    constructor(createUser: Partial<User>) {
        super();
        Object.assign(this, createUser);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        const salt = await bcrypt.genSalt(10);
        if (this.password && !/^\$2a\$\d+\$/.test(this.password)) {
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    async checkPassword(plainPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, this.password);
    }
}
