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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameV2Gateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const game_entity_1 = require("../entities/game.entity");
const socket_io_1 = require("socket.io");
const game_state_service_1 = require("../game-state.service");
const games_service_1 = require("../games.service");
let GameV2Gateway = class GameV2Gateway {
    constructor(gameStateService, gameService) {
        this.gameStateService = gameStateService;
        this.gameService = gameService;
    }
    handleJoinRoom(client, message) {
        client.join(message.room);
        client.emit('joinedRoom', message.room);
        if (message.gameData.gameState === game_entity_1.GameStateEnum.CREATED) {
            this.server.to(message.room).emit(message.room, {
                room: message.room,
                gameId: message.gameId,
                gameData: this.gameStateService.getGameStateData(message.gameId),
            });
        }
        else {
            this.gameService.updateGameState(message.gameId.split('.')[0], message.gameData.gameState);
            const updatedGameData = this.gameStateService.updateGameState(message.gameId, message.gameData);
            let soundUrl = '';
            if (message.soundLang === 'am') {
                soundUrl = `http://localhost:3000/api/games/balls-audio/am/${message.gameData.playingNumbers[message.gameData.currentIndex]}amh.m4a`;
            }
            else if (message.soundLang === 'or') {
                soundUrl = `http://localhost:3000/api/games/balls-audio/or/${message.gameData.playingNumbers[message.gameData.currentIndex]}or.m4a`;
            }
            this.server.to(message.room).emit(message.room, {
                room: message.room,
                gameId: message.gameId,
                soundLang: message.soundLang,
                soundUrl: soundUrl,
                gameData: updatedGameData,
            });
        }
    }
    handleLeaveJoin(client, room) {
        client.join(room);
        client.emit('leftRoom', room);
    }
};
exports.GameV2Gateway = GameV2Gateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameV2Gateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GameV2Gateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], GameV2Gateway.prototype, "handleLeaveJoin", null);
exports.GameV2Gateway = GameV2Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)(8001, {
        cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] },
    }),
    __metadata("design:paramtypes", [game_state_service_1.GameStateService,
        games_service_1.GamesService])
], GameV2Gateway);
//# sourceMappingURL=game-v2.gateway.js.map