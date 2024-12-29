import { Module } from '@nestjs/common';
import { CardGroupService } from './card-group.service';
import { CardGroupController } from './card-group.controller';

@Module({
  controllers: [CardGroupController],
  providers: [CardGroupService]
})
export class CardGroupModule {}
