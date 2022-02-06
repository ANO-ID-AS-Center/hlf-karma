import { NestFactory, ModuleRef } from '@nestjs/core';
import { DefaultLogger } from '@ts-core/backend-nestjs/logger';
import { AppModule } from './src/AppModule';
import { AppSettings } from './src/AppSettings';
import { Chaincode } from './src/Chaincode';
import * as shim from 'fabric-shim';
import { APPLICATION_INJECTOR } from '@ts-core/backend-nestjs';

async function bootstrap() {
    let settings = new AppSettings();
    let logger = (settings.logger = new DefaultLogger(settings.loggerLevel));

    let application = await NestFactory.createApplicationContext(AppModule.forRoot(settings), { logger });
    APPLICATION_INJECTOR(application.get(ModuleRef));

    let chaincode = application.get(Chaincode);
    shim.start(chaincode);
}

bootstrap();