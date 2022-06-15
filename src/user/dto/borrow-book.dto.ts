import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class BorrowBookDto {
    @ApiProperty()
    @IsNotEmpty()
    end_date: Date;
}
