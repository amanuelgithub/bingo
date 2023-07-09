"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const constants_1 = require("./commons/constants");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const configService = app.get(config_1.ConfigService);
    const appConfig = configService.get(constants_1.APP_CONFIG);
    const globalPrefix = appConfig.APP_PREFIX;
    app.setGlobalPrefix(globalPrefix);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const appPort = process.env.PORT || appConfig.APP_PORT;
    await app.listen(appPort, () => console.log('running on port: ', appPort));
}
bootstrap();
//# sourceMappingURL=main.js.map