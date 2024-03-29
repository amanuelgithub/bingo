"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentsModule = void 0;
const common_1 = require("@nestjs/common");
const agents_service_1 = require("./agents.service");
const agents_controller_1 = require("./agents.controller");
const branches_module_1 = require("../branches/branches.module");
const typeorm_1 = require("@nestjs/typeorm");
const agent_entity_1 = require("./entities/agent.entity");
const user_entity_1 = require("../users/entities/user.entity");
const casl_module_1 = require("../casl/casl.module");
let AgentsModule = class AgentsModule {
};
AgentsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([agent_entity_1.Agent, user_entity_1.User]),
            casl_module_1.CaslModule,
            branches_module_1.BranchesModule,
        ],
        controllers: [agents_controller_1.AgentsController],
        providers: [agents_service_1.AgentsService],
        exports: [agents_service_1.AgentsService],
    })
], AgentsModule);
exports.AgentsModule = AgentsModule;
//# sourceMappingURL=agents.module.js.map