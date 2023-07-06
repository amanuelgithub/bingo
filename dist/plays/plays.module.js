"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaysModule = void 0;
const common_1 = require("@nestjs/common");
const plays_service_1 = require("./plays.service");
const plays_controller_1 = require("./plays.controller");
const cards_module_1 = require("../cards/cards.module");
const typeorm_1 = require("@nestjs/typeorm");
const play_entity_1 = require("./entities/play.entity");
const agents_module_1 = require("../agents/agents.module");
const casl_module_1 = require("../casl/casl.module");
let PlaysModule = class PlaysModule {
};
PlaysModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([play_entity_1.Play]),
            casl_module_1.CaslModule,
            cards_module_1.CardsModule,
            agents_module_1.AgentsModule,
        ],
        controllers: [plays_controller_1.PlaysController],
        providers: [plays_service_1.PlaysService],
        exports: [plays_service_1.PlaysService],
    })
], PlaysModule);
exports.PlaysModule = PlaysModule;
//# sourceMappingURL=plays.module.js.map