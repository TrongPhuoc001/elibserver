import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {Author} from 'src/author/entities/author.entity';
import {Genre} from 'src/genres/entities/genre.entity';

export class CreateBookDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    img_link?: string;

    @ApiProperty()
    star?: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    @Type(() => Genre)
    genres?: Genre[];

    @ApiProperty()
    author: Author;
}
