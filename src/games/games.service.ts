import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
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

    // continue from this
    // const gameCreatedEvent = new GameCreatedEvent();
    // gameCreatedEvent.gameId = game.id;
    // this.eventEmitter.emit('game.created', gameCreatedEvent);

    return game;
  }

  async getNewlyCreatedGame() {
    const createdGame = await this.gamesRepository.findOne({
      where: {
        state: GameStateEnum.CREATED,
      },
    });
    const playingGame = await this.gamesRepository.findOne({
      where: {
        state: GameStateEnum.PLAYING,
      },
    });
    const pausedGame = await this.gamesRepository.findOne({
      where: {
        state: GameStateEnum.PAUSED,
      },
    });

    if (!createdGame && !playingGame && pausedGame) {
      throw new NotFoundException('Game not found!');
    }

    return createdGame || playingGame || pausedGame;
  }

  findAll() {
    return `This action returns all games`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
