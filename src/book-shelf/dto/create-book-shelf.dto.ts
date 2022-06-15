import {Book} from 'src/book/entities/book.entity';

export class CreateBookShelfDto {
    book: Book;
    end_date: Date;
}
