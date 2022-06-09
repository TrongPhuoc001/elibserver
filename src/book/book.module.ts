import {Module} from '@nestjs/common';
import {BookService} from './book.service';
import {BookController} from './book.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Book} from './entities/book.entity';
import {GenresModule} from 'src/genres/genres.module';
import {AuthorModule} from 'src/author/author.module';
import {WaitingListModule} from 'src/waiting-list/waiting-list.module';

@Module({
    imports: [
        GenresModule,
        AuthorModule,
        WaitingListModule,
        TypeOrmModule.forFeature([Book]),
    ],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule {}
