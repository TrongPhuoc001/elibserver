import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaitingListService } from './waiting-list.service';
import { CreateWaitingListDto } from './dto/create-waiting-list.dto';
import { UpdateWaitingListDto } from './dto/update-waiting-list.dto';

@Controller('waiting-list')
export class WaitingListController {
  constructor(private readonly waitingListService: WaitingListService) {}

  @Post()
  create(@Body() createWaitingListDto: CreateWaitingListDto) {
    return this.waitingListService.create(createWaitingListDto);
  }

  @Get()
  findAll() {
    return this.waitingListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waitingListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaitingListDto: UpdateWaitingListDto) {
    return this.waitingListService.update(+id, updateWaitingListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waitingListService.remove(+id);
  }
}
