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
exports.CoinEmitHandler = void 0;
const common_1 = require("@nestjs/common");
const handler_1 = require("@hlf-core/transport/chaincode/handler");
const logger_1 = require("@ts-core/common/logger");
const guard_1 = require("@project/module/core/guard");
const coin_1 = require("@project/common/transport/command/coin");
const coin_2 = require("@project/common/transport/event/coin");
const role_1 = require("@project/common/ledger/role");
const CoinService_1 = require("../service/CoinService");
const chaincode_1 = require("@hlf-core/transport/chaincode");
const stub_1 = require("@hlf-core/transport/chaincode/stub");
let CoinEmitHandler = class CoinEmitHandler extends handler_1.TransportCommandFabricAsyncHandler {
    service;
    constructor(logger, transport, service) {
        super(logger, transport, coin_1.CoinEmitCommand.NAME);
        this.service = service;
    }
    async execute(params, holder) {
        await (0, guard_1.rolesCheck)(holder, role_1.LedgerRole.COIN_MANAGER);
        await this.service.walletAmountEmit(holder, await this.service.getWallet(params.to, holder), params.amount);
        await holder.stub.dispatch(new coin_2.CoinEmittedEvent(holder.eventData));
    }
};
__decorate([
    (0, guard_1.UserGuard)(),
    __param(1, (0, stub_1.StubHolder)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CoinEmitHandler.prototype, "execute", null);
CoinEmitHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger, chaincode_1.TransportFabricChaincodeReceiver, CoinService_1.CoinService])
], CoinEmitHandler);
exports.CoinEmitHandler = CoinEmitHandler;
