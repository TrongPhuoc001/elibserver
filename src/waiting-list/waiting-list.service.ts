import { Injectable } from '@nestjs/common';
import { CreateWaitingListDto } from './dto/create-waiting-list.dto';
import { UpdateWaitingListDto } from './dto/update-waiting-list.dto';

@Injectable()
export class WaitingListService {
  create(createWaitingListDto: CreateWaitingListDto) {
    return 'This action adds a new waitingList';
  }

  findAll() {
    return `This action returns all waitingList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} waitingList`;
  }

  update(id: number, updateWaitingListDto: UpdateWaitingListDto) {
    return `This action updates a #${id} waitingList`;
  }

  remove(id: number) {
    return `This action removes a #${id} waitingList`;
  }
}
