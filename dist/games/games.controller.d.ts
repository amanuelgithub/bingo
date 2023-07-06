import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { Game } from './entities/game.entity';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    create(createGameDto: CreateGameDto): Promise<Game>;
    getActiveGameByCashier(cashierId: string): Promise<Game>;
    updateGame(gameId: string): Promise<Game>;
    getSound(lang: 'am' | 'or' | string, audioname: string, res: any): any;
}
