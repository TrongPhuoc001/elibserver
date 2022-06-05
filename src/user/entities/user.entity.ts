import {ApiProperty} from '@nestjs/swagger';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {BookShelf} from 'src/book-shelf/entities/book-shelf.entity';
import {WaitingList} from 'src/waiting-list/entities/waiting-list.entity';
@Entity()
export class User {
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

    @OneToOne(() => BookShelf, (bookShelf) => bookShelf.user)
    book_shelf: BookShelf;

    @ManyToMany(() => WaitingList, (waitingList) => waitingList.users)
    waiting_lists: WaitingList[];

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
