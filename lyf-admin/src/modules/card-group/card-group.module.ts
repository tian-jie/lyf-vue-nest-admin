import { Module } from '@nestjs/common';
import { CardGroupService } from './card-group.service';
import { CardGroupController } from './card-group.controller';
import { BoardService } from '../board/board.service';

@Module({
  controllers: [CardGroupController],
  providers: [CardGroupService, BoardService]
})
export class CardGroupModule {}
