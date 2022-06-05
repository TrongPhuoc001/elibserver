import { PartialType } from '@nestjs/swagger';
import { CreateBookShelfDto } from './create-book-shelf.dto';

export class UpdateBookShelfDto extends PartialType(CreateBookShelfDto) {}
