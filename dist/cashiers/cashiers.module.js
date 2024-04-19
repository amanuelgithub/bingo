"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashiersModule = void 0;
const common_1 = require("@nestjs/common");
const cashiers_service_1 = require("./cashiers.service");
const cashiers_controller_1 = require("./cashiers.controller");
const branches_module_1 = require("../branches/branches.module");
const typeorm_1 = require("@nestjs/typeorm");
const cashier_entity_1 = require("./entities/cashier.entity");
const user_entity_1 = require("../users/entities/user.entity");
const casl_module_1 = require("../casl/casl.module");
const plays_module_1 = require("../plays/plays.module");
let CashiersModule = class CashiersModule {
};
exports.CashiersModule = CashiersModule;
exports.CashiersModule = CashiersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([cashier_entity_1.Cashier, user_entity_1.User]),
            casl_module_1.CaslModule,
            branches_module_1.BranchesModule,
            plays_module_1.PlaysModule,
        ],
        controllers: [cashiers_controller_1.CashiersController],
        providers: [cashiers_service_1.CashiersService],
    })
], CashiersModule);
//# sourceMappingURL=cashiers.module.js.map