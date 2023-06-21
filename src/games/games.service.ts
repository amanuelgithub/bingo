import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entities/game.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameCreatedEvent } from './events/game-created.event';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private gamesRepository: Repository<Game>,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const game = this.gamesRepository.create(createGameDto);
    if (!game) {
      throw new InternalServerErrorException();
    }
    await this.gamesRepository.save(game);

    // continue from this
    const gameCreatedEvent = new GameCreatedEvent();
    gameCreatedEvent.gameId = game.id;
    this.eventEmitter.emit('game.created', gameCreatedEvent);

    return game;
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
