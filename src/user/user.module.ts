import {Module} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {BookShelfModule} from 'src/book-shelf/book-shelf.module';
import {BookModule} from 'src/book/book.module';

@Module({
    imports: [BookShelfModule, BookModule, TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
