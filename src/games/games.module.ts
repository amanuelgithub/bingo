import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { CaslModule } from '../casl/casl.module';
import { GameGateway } from './gateways/game.gateway';
import { GameStateService } from './game-state.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), CaslModule],
  controllers: [GamesController],
  providers: [GamesService, GameStateService, GameGateway],
})
export class GamesModule {}
