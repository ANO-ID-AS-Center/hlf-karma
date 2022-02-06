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
exports.CoinService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const _ = require("lodash");
const coin_1 = require("@project/common/transport/command/coin");
const util_1 = require("@ts-core/common/util");
const error_1 = require("@project/common/ledger/error");
const company_1 = require("@project/common/ledger/company");
const project_1 = require("@project/common/ledger/project");
const error_2 = require("@ts-core/common/error");
let CoinService = class CoinService extends logger_1.LoggerWrapper {
    constructor(logger) {
        super(logger);
    }
    async walletAccountGet(holder, wallet, coinId) {
        let item = await holder.db.wallet.accountGet(wallet, coinId);
        if (_.isNil(item)) {
            item = holder.db.wallet.accountCreate(wallet, coinId, '0');
        }
        return item;
    }
    async walletCheckAccount(holder, item) {
        if (util_1.MathUtil.lessThan(item.value, '0')) {
            throw new error_1.LedgerError(error_1.LedgerErrorCode.BAD_REQUEST, `Wallet account balance can't be less than zero`);
        }
        if (util_1.MathUtil.equals(item.value, '0')) {
            await holder.db.walletAccount.remove(item);
        }
        else {
            await holder.db.walletAccount.save(item);
        }
    }
    async getWallet(source, holder) {
        let item = null;
        switch (source.type) {
            case coin_1.CoinObjectType.COMPANY:
                let company = await holder.db.company.get(source.uid, ['wallet']);
                if (_.isNil(company)) {
                    throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Company ${source.uid} not found`);
                }
                if (company.status !== company_1.LedgerCompanyStatus.ACTIVE) {
                    throw new error_1.LedgerError(error_1.LedgerErrorCode.FORBIDDEN, `Company "${company.uid}" status is not ${company_1.LedgerCompanyStatus.ACTIVE}`);
                }
                item = company.wallet;
                break;
            case coin_1.CoinObjectType.PROJECT:
                let project = await holder.db.project.get(source.uid, ['wallet']);
                if (_.isNil(project)) {
                    throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Project ${source.uid} not found`);
                }
                if (project.status !== project_1.LedgerProjectStatus.ACTIVE) {
                    throw new error_1.LedgerError(error_1.LedgerErrorCode.FORBIDDEN, `Project "${project.uid}" status is not ${project_1.LedgerProjectStatus.ACTIVE}`);
                }
                item = project.wallet;
                break;
            default:
                throw new error_2.UnreachableStatementError(source.type);
        }
        if (_.isNil(item)) {
            throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Wallet for ${source.type} (${source.uid}) not found`);
        }
        return item;
    }
    async walletAmountEmit(holder, wallet, amount) {
        let item = await this.walletAccountGet(holder, wallet, amount.coinId);
        item.value = util_1.MathUtil.add(item.value, amount.value);
        await this.walletCheckAccount(holder, item);
    }
    async walletAmountBurn(holder, wallet, amount) {
        let item = await this.walletAccountGet(holder, wallet, amount.coinId);
        item.value = util_1.MathUtil.subtract(item.value, amount.value);
        await this.walletCheckAccount(holder, item);
    }
};
CoinService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger])
], CoinService);
exports.CoinService = CoinService;
