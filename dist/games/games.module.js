"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesModule = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
const games_controller_1 = require("./games.controller");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("./entities/game.entity");
const casl_module_1 = require("../casl/casl.module");
const game_gateway_1 = require("./gateways/game.gateway");
const game_state_service_1 = require("./game-state.service");
let GamesModule = class GamesModule {
};
exports.GamesModule = GamesModule;
exports.GamesModule = GamesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([game_entity_1.Game]), casl_module_1.CaslModule],
        controllers: [games_controller_1.GamesController],
        providers: [games_service_1.GamesService, game_state_service_1.GameStateService, game_gateway_1.GameGateway],
    })
], GamesModule);
//# sourceMappingURL=games.module.js.map