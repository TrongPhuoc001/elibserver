import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsNotEmpty} from 'class-validator';
import {Author} from 'src/author/entities/author.entity';
import {Genre} from 'src/genres/entities/genre.entity';

export class CreateBookDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    img_link?: string;

    @ApiProperty()
    @IsNotEmpty()
    star?: string;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @Type(() => Genre)
    genres?: Genre[];

    @ApiProperty()
    author: Author;
}
