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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const games_service_1 = require("./games.service");
const create_game_dto_1 = require("./dto/create-game.dto");
const check_policy_decorator_1 = require("../casl/check-policy.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const policies_guard_1 = require("../casl/policies.guard");
const casl_ability_factory_1 = require("../casl/casl-ability.factory");
const game_entity_1 = require("./entities/game.entity");
const path_1 = require("path");
let GamesController = class GamesController {
    constructor(gamesService) {
        this.gamesService = gamesService;
    }
    create(createGameDto) {
        return this.gamesService.create(createGameDto);
    }
    getActiveGameByCashier(cashierId) {
        return this.gamesService.getActiveGameByCashier(cashierId);
    }
    updateGame(gameId) {
        return this.gamesService.updateGameState(gameId);
    }
    getSound(lang, audioname, res) {
        console.log('lang: ', lang);
        console.log('audioname: ', audioname);
        if (lang === 'am') {
            return res.sendFile((0, path_1.join)(process.cwd(), '_sounds/am/' + audioname));
        }
        else if (lang === 'or') {
            return res.sendFile((0, path_1.join)(process.cwd(), '_sounds/or/' + audioname));
        }
        else {
            return res.sendFile((0, path_1.join)(process.cwd(), '_sounds/am/' + audioname));
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Create, game_entity_1.Game)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_game_dto_1.CreateGameDto]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/active/:cashierId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, game_entity_1.Game)),
    __param(0, (0, common_1.Param)('cashierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getActiveGameByCashier", null);
__decorate([
    (0, common_1.Patch)('/end-game/:gameId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Update, game_entity_1.Game)),
    __param(0, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "updateGame", null);
__decorate([
    (0, common_1.Get)('/balls-audio/:lang/:audioname'),
    __param(0, (0, common_1.Param)('lang')),
    __param(1, (0, common_1.Param)('audioname')),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getSound", null);
GamesController = __decorate([
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
exports.GamesController = GamesController;
//# sourceMappingURL=games.controller.js.map