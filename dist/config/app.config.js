"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const config_1 = require("@nestjs/config");
const constants_1 = require("../commons/constants");
exports.appConfig = (0, config_1.registerAs)(constants_1.APP_CONFIG, () => ({
    APP_PREFIX: 'api' || process.env.APP_PREFIX,
    APP_PORT: 3001 || process.env.APP_PORT,
}));
//# sourceMappingURL=app.config.js.map