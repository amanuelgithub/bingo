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
exports.CashiersController = void 0;
const common_1 = require("@nestjs/common");
const cashiers_service_1 = require("./cashiers.service");
const create_cashier_dto_1 = require("./dto/create-cashier.dto");
const check_policy_decorator_1 = require("../casl/check-policy.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const policies_guard_1 = require("../casl/policies.guard");
const casl_ability_factory_1 = require("../casl/casl-ability.factory");
const cashier_entity_1 = require("./entities/cashier.entity");
let CashiersController = class CashiersController {
    constructor(cashiersService) {
        this.cashiersService = cashiersService;
    }
    register(createCashierDto) {
        return this.cashiersService.create(createCashierDto);
    }
    findOne(id) {
        return this.cashiersService.findOne(id);
    }
    findBranchCashiers(branchId) {
        return this.cashiersService.findBranchCashiers(branchId);
    }
    findAgentCashiers(agentId) {
        return this.cashiersService.findAgentCashiers(agentId);
    }
    findCashierCashBook(cashierId) {
        return this.cashiersService.findCashierCashBook(cashierId);
    }
    clearCashierCashBook(cashierId) {
        return this.cashiersService.clearCashierCashBook(cashierId);
    }
};
exports.CashiersController = CashiersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Create, cashier_entity_1.Cashier)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cashier_dto_1.CreateCashierDto]),
    __metadata("design:returntype", void 0)
], CashiersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, cashier_entity_1.Cashier)),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashiersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/branch/:branchId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, cashier_entity_1.Cashier)),
    __param(0, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashiersController.prototype, "findBranchCashiers", null);
__decorate([
    (0, common_1.Get)('/agent-branches/:agentId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, cashier_entity_1.Cashier)),
    __param(0, (0, common_1.Param)('agentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashiersController.prototype, "findAgentCashiers", null);
__decorate([
    (0, common_1.Get)('/cash-book/:cashierId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, cashier_entity_1.Cashier)),
    __param(0, (0, common_1.Param)('cashierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashiersController.prototype, "findCashierCashBook", null);
__decorate([
    (0, common_1.Patch)('/clear-cash-book/:cashierId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, cashier_entity_1.Cashier)),
    __param(0, (0, common_1.Param)('cashierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CashiersController.prototype, "clearCashierCashBook", null);
exports.CashiersController = CashiersController = __decorate([
    (0, common_1.Controller)('cashiers'),
    __metadata("design:paramtypes", [cashiers_service_1.CashiersService])
], CashiersController);
//# sourceMappingURL=cashiers.controller.js.map