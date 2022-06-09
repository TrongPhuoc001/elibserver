import {Module} from '@nestjs/common';
import {WaitingListService} from './waiting-list.service';
import {WaitingListController} from './waiting-list.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {WaitingList} from './entities/waiting-list.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WaitingList])],
    controllers: [WaitingListController],
    providers: [WaitingListService],
    exports: [WaitingListService],
})
export class WaitingListModule {}
