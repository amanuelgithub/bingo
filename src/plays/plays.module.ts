import { Module } from '@nestjs/common';
import { PlaysService } from './plays.service';
import { PlaysController } from './plays.controller';
import { CardsModule } from 'src/cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Play } from './entities/play.entity';
import { AgentsModule } from 'src/agents/agents.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Play]),
    CaslModule,
    CardsModule,
    AgentsModule,
  ],
  controllers: [PlaysController],
  providers: [PlaysService],
  exports: [PlaysService],
})
export class PlaysModule {}
