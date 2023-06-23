import { Module } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { CardsModule } from 'src/cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Play]), CardsModule],
  controllers: [PlaysController],
  providers: [PlaysService],
})
export class PlaysModule {}
