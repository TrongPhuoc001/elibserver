import {ApiProperty} from '@nestjs/swagger';

export class CreateLibrarianDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    account: string;

    @ApiProperty()
    password: string;
}
