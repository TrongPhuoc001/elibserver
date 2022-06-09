import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional} from 'class-validator';

export class RegisterDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    account: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsOptional()
    phone_number: string;

    @ApiProperty()
    @IsOptional()
    gender: string;

    @ApiProperty()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    userType: number;
}
