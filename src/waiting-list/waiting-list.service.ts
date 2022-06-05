import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateWaitingListDto} from './dto/create-waiting-list.dto';
import {UpdateWaitingListDto} from './dto/update-waiting-list.dto';
import {WaitingList} from './entities/waiting-list.entity';

@Injectable()
export class WaitingListService {
    constructor(
        @InjectRepository(WaitingList)
        private readonly waitingListRepository: Repository<WaitingList>,
    ) {}
    create(createWaitingListDto: CreateWaitingListDto) {
        return this.waitingListRepository.save(
            new WaitingList(createWaitingListDto),
        );
    }

    findAll() {
        return this.waitingListRepository.find();
    }

    findOne(id: number) {
        return this.waitingListRepository.findOne(id);
    }

    async update(id: number, updateWaitingListDto: UpdateWaitingListDto) {
        const waitingList = await this.waitingListRepository.findOne(id);
        return this.waitingListRepository.save({
            ...waitingList,
            ...updateWaitingListDto,
        });
    }

    async remove(id: number) {
        const waitingList = await this.findOne(id);
        return this.waitingListRepository.delete(waitingList);
    }
}
