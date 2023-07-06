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
exports.AgentsController = void 0;
const common_1 = require("@nestjs/common");
const agents_service_1 = require("./agents.service");
const create_agent_dto_1 = require("./dto/create-agent.dto");
const check_policy_decorator_1 = require("../casl/check-policy.decorator");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const policies_guard_1 = require("../casl/policies.guard");
const casl_ability_factory_1 = require("../casl/casl-ability.factory");
const agent_entity_1 = require("./entities/agent.entity");
let AgentsController = class AgentsController {
    constructor(agentsService) {
        this.agentsService = agentsService;
    }
    register(createAgentDto) {
        return this.agentsService.create(createAgentDto);
    }
    findAll() {
        return this.agentsService.findAll();
    }
    findOne(id) {
        return this.agentsService.findOne(id);
    }
    addBranchToAgent(agentId, branchId) {
        return this.agentsService.addBranchToAgent(agentId, branchId);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Create, agent_entity_1.Agent)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_agent_dto_1.CreateAgentDto]),
    __metadata("design:returntype", void 0)
], AgentsController.prototype, "register", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Manage, agent_entity_1.Agent)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AgentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Read, agent_entity_1.Agent)),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AgentsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/add-branch/:agentId/:branchId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, policies_guard_1.PoliciesGuard),
    (0, check_policy_decorator_1.CheckPolicies)((ability) => ability.can(casl_ability_factory_1.Action.Create, agent_entity_1.Agent)),
    __param(0, (0, common_1.Param)('agentId')),
    __param(1, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AgentsController.prototype, "addBranchToAgent", null);
AgentsController = __decorate([
    (0, common_1.Controller)('agents'),
    __metadata("design:paramtypes", [agents_service_1.AgentsService])
], AgentsController);
exports.AgentsController = AgentsController;
//# sourceMappingURL=agents.controller.js.map