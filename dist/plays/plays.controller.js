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
exports.PlaysController = void 0;
const common_1 = require("@nestjs/common");
const plays_service_1 = require("./plays.service");
const sell_card_dto_1 = require("./dto/sell-card.dto");
const play_entity_1 = require("./entities/play.entity");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const check_policy_decorator_1 = require("../casl/check-policy.decorator");
const policies_guard_1 = require("../casl/policies.guard");
const casl_ability_factory_1 = require("../casl/casl-ability.factory");
let PlaysController = class PlaysController {
    constructor(playsService) {
        this.playsService = playsService;
    }
    sellCard(sellCardDto) {
        return this.playsService.sellCard(sellCardDto);
    }
    findUnsoldCards(branchId, gameId) {
        return this.playsService.findUnsoldCards(branchId, gameId);
    }
    findGameSoldPlays(branchId, gameId) {
        return this.playsService.findGameSoldPlays(branchId, gameId);
    }
    todayProfitForAllBranches() {
        return this.playsService.todayProfitForAllBranches();
    }
    thisMonthProfitForAllBranches() {
        return this.playsService.thisMonthProfitForAllBranches();
    }
    thisYearProfitForAllBranches() {
        return this.playsService.thisYearProfitForAllBranches();
    }
    twelveMonthProfitForAllBranches() {
        return this.playsService.twelveMonthProfitForAllBranches();
    }
    totalProfitForAllBranches() {
        return this.playsService.totalProfitForAllBranches();
    }
    todayProfitForAgentBranches(agentId) {
        return this.playsService.todayProfitForAgentBranches(agentId);
    }
    thisMonthProfitsForAgentBranches(agentId) {
        return this.playsService.thisMonthProfitsForAgentBranches(agentId);
    }
    thisYearProfitsForAgentBranches(agentId) {
        return this.playsService.thisYearProfitForAgentBranches(agentId);
    }
    totalProfitsForAgentBranches(agentId) {
        return this.playsService.totalProfitsForAgentBranches(agentId);
    }
    twelveMonthProfitsForAgentBranches(agentId) {
        return this.playsService.twelveMonthProfitForAgentBranches(agentId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sell_card_dto_1.SellCardDto]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "sellCard", null);
__decorate([
    (0, common_1.Get)('/unsold-cards/:branchId/:gameId'),
    __param(0, (0, common_1.Param)('branchId')),
    __param(1, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "findUnsoldCards", null);
__decorate([
    (0, common_1.Get)('/game-plays/:branchId/:gameId'),
    __param(0, (0, common_1.Param)('branchId')),
    __param(1, (0, common_1.Param)('gameId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "findGameSoldPlays", null);
__decorate([
    (0, common_1.Get)('/admin-profit/today'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "todayProfitForAllBranches", null);
__decorate([
    (0, common_1.Get)('/admin-profit/this-month'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "thisMonthProfitForAllBranches", null);
__decorate([
    (0, common_1.Get)('/admin-profit/this-year'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "thisYearProfitForAllBranches", null);
__decorate([
    (0, common_1.Get)('/admin-profit/twelve-month-report'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "twelveMonthProfitForAllBranches", null);
__decorate([
    (0, common_1.Get)('/admin-profit/total'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "totalProfitForAllBranches", null);
__decorate([
    (0, common_1.Get)('/agent-profit/:agentId/today'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "todayProfitForAgentBranches", null);
__decorate([
    (0, common_1.Get)('/agent-profit/:agentId/this-month'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "thisMonthProfitsForAgentBranches", null);
__decorate([
    (0, common_1.Get)('/agent-profit/:agentId/this-year'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "thisYearProfitsForAgentBranches", null);
__decorate([
    (0, common_1.Get)('/agent-profit/:agentId/total'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "totalProfitsForAgentBranches", null);
__decorate([
    (0, common_1.Get)('/agent-profit/:agentId/twelve-month-report'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, play_entity_1.Play)),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlaysController.prototype, "twelveMonthProfitsForAgentBranches", null);
PlaysController = __decorate([
    (0, common_1.Controller)('plays'),
    __metadata("design:paramtypes", [plays_service_1.PlaysService])
], PlaysController);
exports.PlaysController = PlaysController;
//# sourceMappingURL=plays.controller.js.map