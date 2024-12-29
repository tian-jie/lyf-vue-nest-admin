import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { CardGroupService } from '../card-group/card-group.service';

@Module({
  controllers: [CardController],
  providers: [CardService, CardGroupService]
})
export class CardModule {}
