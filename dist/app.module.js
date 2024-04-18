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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./users/users.module");
const agents_module_1 = require("./agents/agents.module");
const cashiers_module_1 = require("./cashiers/cashiers.module");
const branches_module_1 = require("./branches/branches.module");
const games_module_1 = require("./games/games.module");
const plays_module_1 = require("./plays/plays.module");
const auth_module_1 = require("./auth/auth.module");
const casl_module_1 = require("./casl/casl.module");
const cards_module_1 = require("./cards/cards.module");
const cards_service_1 = require("./cards/cards.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const schedule_1 = require("@nestjs/schedule");
const user_entity_1 = require("./users/entities/user.entity");
const agent_entity_1 = require("./agents/entities/agent.entity");
const cashier_entity_1 = require("./cashiers/entities/cashier.entity");
const branch_entity_1 = require("./branches/entities/branch.entity");
const game_entity_1 = require("./games/entities/game.entity");
const play_entity_1 = require("./plays/entities/play.entity");
let AppModule = class AppModule {
    constructor(cardsService) {
        this.cardsService = cardsService;
        cardsService.createJSONFile();
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                database: 'bingo',
                username: 'postgres',
                password: 'postgres',
                entities: [user_entity_1.User, agent_entity_1.Agent, cashier_entity_1.Cashier, branch_entity_1.Branch, game_entity_1.Game, play_entity_1.Play],
                autoLoadEntities: true,
                synchronize: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot(),
            users_module_1.UsersModule,
            agents_module_1.AgentsModule,
            cashiers_module_1.CashiersModule,
            branches_module_1.BranchesModule,
            games_module_1.GamesModule,
            plays_module_1.PlaysModule,
            auth_module_1.AuthModule,
            casl_module_1.CaslModule,
            cards_module_1.CardsModule,
        ],
    }),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map