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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/backend-nestjs/logger");
const AppSettings_1 = require("./AppSettings");
const Chaincode_1 = require("./Chaincode");
const UserModule_1 = require("./user/UserModule");
const transport_1 = require("@project/module/core/transport");
const CoinModule_1 = require("./coin/CoinModule");
const CompanyModule_1 = require("./company/CompanyModule");
const ProjectModule_1 = require("./project/ProjectModule");
const GenesisModule_1 = require("./genesis/GenesisModule");
const logger_2 = require("@ts-core/common/logger");
const promise_1 = require("@ts-core/common/promise");
const util_1 = require("@ts-core/common/util");
const core_1 = require("@project/module/core");
let AppModule = class AppModule extends core_1.AbstractService {
    static forRoot(settings) {
        return {
            module: AppModule,
            imports: [
                logger_1.LoggerModule.forRoot(settings),
                transport_1.TransportFabricChaincodeModule.forRoot(settings),
                GenesisModule_1.GenesisModule,
                CoinModule_1.CoinModule,
                UserModule_1.UserModule,
                CompanyModule_1.CompanyModule,
                ProjectModule_1.ProjectModule
            ],
            providers: [
                {
                    provide: AppSettings_1.AppSettings,
                    useValue: settings
                },
                Chaincode_1.Chaincode
            ],
            controllers: []
        };
    }
    constructor(logger, settings, chaincode) {
        super(chaincode.name, settings, logger);
    }
    async onApplicationBootstrap() {
        await super.onApplicationBootstrap();
        if (this.settings.isTesting) {
            this.warn(`Service works in ${this.settings.mode}: some functions could work different way`);
        }
        this.initialize();
    }
    async initialize() {
        await promise_1.PromiseHandler.delay(util_1.DateUtil.MILISECONDS_SECOND);
    }
};
AppModule = __decorate([
    __param(0, (0, common_1.Inject)(logger_2.Logger)),
    __metadata("design:paramtypes", [logger_2.Logger, AppSettings_1.AppSettings, Chaincode_1.Chaincode])
], AppModule);
exports.AppModule = AppModule;
