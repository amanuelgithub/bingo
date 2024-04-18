"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const config_1 = require("@nestjs/config");
const constants_1 = require("../commons/constants");
const dotenv = require("dotenv");
const user_entity_1 = require("../users/entities/user.entity");
const agent_entity_1 = require("../agents/entities/agent.entity");
const cashier_entity_1 = require("../cashiers/entities/cashier.entity");
const branch_entity_1 = require("../branches/entities/branch.entity");
const game_entity_1 = require("../games/entities/game.entity");
const play_entity_1 = require("../plays/entities/play.entity");
dotenv.config({ path: `${process.cwd()}/src/env/${process.env.NODE_ENV}.env` });
const postgresqlDataSourceOption = {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'bingo',
    username: 'root',
    password: '',
    entities: [user_entity_1.User, agent_entity_1.Agent, cashier_entity_1.Cashier, branch_entity_1.Branch, game_entity_1.Game, play_entity_1.Play],
    autoLoadEntities: true,
    synchronize: true,
};
const sqliteDataSourceOption = {
    type: 'sqlite',
    database: process.env.BINGO_DB_NAME || constants_1.DATABASE_NAME,
    logging: true,
    migrationsRun: true,
    synchronize: true,
};
exports.DatabaseConfig = (0, config_1.registerAs)(constants_1.DB_CONFIG, () => {
    return postgresqlDataSourceOption;
});
//# sourceMappingURL=database.config.js.map