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
exports.CoinTransferHandler = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const guard_1 = require("@project/module/core/guard");
const coin_1 = require("@project/common/transport/command/coin");
const coin_2 = require("@project/common/transport/event/coin");
const role_1 = require("@project/common/ledger/role");
const CoinService_1 = require("../service/CoinService");
const error_1 = require("@ts-core/common/error");
const promise_1 = require("@ts-core/common/promise");
const chaincode_1 = require("@hlf-core/transport/chaincode");
const handler_1 = require("@hlf-core/transport/chaincode/handler");
const stub_1 = require("@hlf-core/transport/chaincode/stub");
let CoinTransferHandler = class CoinTransferHandler extends handler_1.TransportCommandFabricAsyncHandler {
    service;
    constructor(logger, transport, service) {
        super(logger, transport, coin_1.CoinTransferCommand.NAME);
        this.service = service;
    }
    async execute(params, holder) {
        switch (params.from.type) {
            case coin_1.CoinObjectType.COMPANY:
                await (0, guard_1.rolesSomeOf)(promise_1.PromiseReflector.create((0, guard_1.rolesCompanyCheck)(holder, params.from.uid, role_1.LedgerCompanyRole.COIN_MANAGER)), promise_1.PromiseReflector.create((0, guard_1.rolesCompanyCheck)(holder, params.from.uid, role_1.LedgerCompanyRole.USER_MANAGER)));
                break;
            case coin_1.CoinObjectType.PROJECT:
                await (0, guard_1.rolesSomeOf)(promise_1.PromiseReflector.create((0, guard_1.rolesProjectCheck)(holder, params.from.uid, role_1.LedgerProjectRole.COIN_MANAGER)), promise_1.PromiseReflector.create((0, guard_1.rolesProjectCheck)(holder, params.from.uid, role_1.LedgerProjectRole.USER_MANAGER)));
                break;
            default:
                throw new error_1.UnreachableStatementError(params.from.type);
        }
        await this.service.walletAmountBurn(holder, await this.service.getWallet(params.from, holder), params.amount);
        await this.service.walletAmountEmit(holder, await this.service.getWallet(params.to, holder), params.amount);
        await holder.stub.dispatch(new coin_2.CoinTransferedEvent(holder.eventData));
    }
};
__decorate([
    (0, guard_1.UserGuard)(),
    __param(1, (0, stub_1.StubHolder)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CoinTransferHandler.prototype, "execute", null);
CoinTransferHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger, chaincode_1.TransportFabricChaincodeReceiver, CoinService_1.CoinService])
], CoinTransferHandler);
exports.CoinTransferHandler = CoinTransferHandler;
