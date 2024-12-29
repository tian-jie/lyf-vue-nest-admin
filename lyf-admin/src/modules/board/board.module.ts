import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { CardGroupService } from '../card-group/card-group.service';
import { CardService } from '../card/card.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, CardGroupService, CardService]
})
export class BoardModule {}
