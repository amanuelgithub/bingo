import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game, GameStateEnum } from './entities/game.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameCreatedEvent } from './events/game-created.event';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = this.gamesRepository.create({
      ...createGameDto,
      state: GameStateEnum.CREATED,
    });
    if (!game) {
      throw new InternalServerErrorException();
    }
    await this.gamesRepository.save(game);

    const gameCreatedEvent = new GameCreatedEvent();
    gameCreatedEvent.gameId = game.id;
    this.eventEmitter.emit('game.created', gameCreatedEvent);

    return game;
  }

  // returns an active by a specific cashierId
  async getActiveGameByCashier(cashierId: string) {
    const createdGame = await this.gamesRepository
      .createQueryBuilder('game')
      .where('game.cashierId = :cashierId', { cashierId })
      .andWhere('game.state = :state', { state: GameStateEnum.CREATED })
      .getOne();

    const playingGame = await this.gamesRepository
      .createQueryBuilder('game')
      .where('game.cashierId = :cashierId', { cashierId })
      .andWhere('game.state = :state', { state: GameStateEnum.PLAYING })
      .getOne();

    const pausedGame = await this.gamesRepository
      .createQueryBuilder('game')
      .where('game.cashierId = :cashierId', { cashierId })
      .andWhere('game.state = :state', { state: GameStateEnum.PAUSED })
      .getOne();

    if (!createdGame && !playingGame && !pausedGame) {
      throw new NotFoundException('No active game found!');
    }

    return createdGame || playingGame || pausedGame;
  }
}
