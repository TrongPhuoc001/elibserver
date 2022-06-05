import {Module} from '@nestjs/common';
import {BookShelfService} from './book-shelf.service';
import {BookShelfController} from './book-shelf.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BookShelf} from './entities/book-shelf.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BookShelf])],
    controllers: [BookShelfController],
    providers: [BookShelfService],
})
export class BookShelfModule {}
