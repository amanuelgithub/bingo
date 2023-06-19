import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';

@Module({
  providers: [CardsService],
  exports: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
