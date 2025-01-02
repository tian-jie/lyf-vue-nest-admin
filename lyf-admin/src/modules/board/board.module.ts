import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { CardGroupService } from '../card-group/card-group.service';
import { CardService } from '../card/card.service';
import { CardGateway } from '../card/card.gateway';
import { LoggerService } from '../shared/logger.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [BoardController],
  providers: [
    BoardService,
    CardGroupService,
    CardService,
    CardGateway,
    ConfigService,
    LoggerService
  ]
})
export class BoardModule {}
