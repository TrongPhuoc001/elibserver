import { PartialType } from '@nestjs/swagger';
import { CreateWaitingListDto } from './create-waiting-list.dto';

export class UpdateWaitingListDto extends PartialType(CreateWaitingListDto) {}
