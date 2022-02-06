"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const logger_1 = require("@ts-core/backend-nestjs/logger");
const AppModule_1 = require("./src/AppModule");
const AppSettings_1 = require("./src/AppSettings");
const Chaincode_1 = require("./src/Chaincode");
const shim = require("fabric-shim");
const backend_nestjs_1 = require("@ts-core/backend-nestjs");
async function bootstrap() {
    let settings = new AppSettings_1.AppSettings();
    let logger = (settings.logger = new logger_1.DefaultLogger(settings.loggerLevel));
    let application = await core_1.NestFactory.createApplicationContext(AppModule_1.AppModule.forRoot(settings), { logger });
    (0, backend_nestjs_1.APPLICATION_INJECTOR)(application.get(core_1.ModuleRef));
    let chaincode = application.get(Chaincode_1.Chaincode);
    shim.start(chaincode);
}
bootstrap();
