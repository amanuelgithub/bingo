import { CreateGameDto } from './dto/create-game.dto';
import { Repository } from 'typeorm';
import { Game, GameStateEnum } from './entities/game.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class GamesService {
    private gamesRepository;
    private eventEmitter;
    constructor(gamesRepository: Repository<Game>, eventEmitter: EventEmitter2);
    create(createGameDto: CreateGameDto): Promise<Game>;
    getActiveGameByCashier(cashierId: string): Promise<Game>;
    updateGameState(gameId: string, gameState?: GameStateEnum): Promise<Game>;
}
