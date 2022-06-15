import {Module} from '@nestjs/common';
import {BookShelfService} from './book-shelf.service';
import {BookShelfController} from './book-shelf.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BookShelf} from './entities/book-shelf.entity';
import {UserModule} from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([BookShelf])],
    controllers: [BookShelfController],
    providers: [BookShelfService],
    exports: [BookShelfService],
})
export class BookShelfModule {}
