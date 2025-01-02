import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardGroupService } from '../card-group/card-group.service';
import { BoardService } from '../board/board.service';
import { CardGateway } from './card.gateway';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '../shared/logger.service';

@Module({
  controllers: [CardController],
  providers: [
    CardService,
    CardGroupService,
    BoardService,
    CardGateway,
    ConfigService,
    LoggerService
  ]
})
export class CardModule {}
