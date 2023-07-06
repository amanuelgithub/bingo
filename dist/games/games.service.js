"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_entity_1 = require("./entities/game.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const game_created_event_1 = require("./events/game-created.event");
let GamesService = class GamesService {
    constructor(gamesRepository, eventEmitter) {
        this.gamesRepository = gamesRepository;
        this.eventEmitter = eventEmitter;
    }
    async create(createGameDto) {
        const game = this.gamesRepository.create(Object.assign(Object.assign({}, createGameDto), { state: game_entity_1.GameStateEnum.CREATED }));
        if (!game) {
            throw new common_1.InternalServerErrorException();
        }
        await this.gamesRepository.save(game);
        const gameCreatedEvent = new game_created_event_1.GameCreatedEvent();
        gameCreatedEvent.gameId = game.id;
        this.eventEmitter.emit('game.created', gameCreatedEvent);
        return game;
    }
    async getActiveGameByCashier(cashierId) {
        const createdGame = await this.gamesRepository
            .createQueryBuilder('game')
            .where('game.cashierId = :cashierId', { cashierId })
            .andWhere('game.state = :state', { state: game_entity_1.GameStateEnum.CREATED })
            .getOne();
        const playingGame = await this.gamesRepository
            .createQueryBuilder('game')
            .where('game.cashierId = :cashierId', { cashierId })
            .andWhere('game.state = :state', { state: game_entity_1.GameStateEnum.PLAYING })
            .getOne();
        const pausedGame = await this.gamesRepository
            .createQueryBuilder('game')
            .where('game.cashierId = :cashierId', { cashierId })
            .andWhere('game.state = :state', { state: game_entity_1.GameStateEnum.PAUSED })
            .getOne();
        if (!createdGame && !playingGame && !pausedGame) {
            throw new common_1.NotFoundException('No active game found!');
        }
        return createdGame || playingGame || pausedGame;
    }
    async updateGameState(gameId, gameState = game_entity_1.GameStateEnum.END) {
        const game = await this.gamesRepository.findOne({ where: { id: gameId } });
        if (!game) {
            throw new common_1.NotFoundException('Game is not found!');
        }
        game.state = gameState;
        return await this.gamesRepository.save(game);
    }
};
GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_entity_1.Game)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        event_emitter_1.EventEmitter2])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map