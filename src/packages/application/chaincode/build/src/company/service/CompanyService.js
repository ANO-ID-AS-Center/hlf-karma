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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const role_1 = require("@project/common/ledger/role");
const _ = require("lodash");
const company_1 = require("@project/common/transport/event/company");
const company_2 = require("@project/common/ledger/company");
const wallet_1 = require("@project/common/ledger/wallet");
let CompanyService = class CompanyService extends logger_1.LoggerWrapper {
    constructor(logger) {
        super(logger);
    }
    async add(holder, params, isDefaultRootCompany) {
        let item = !isDefaultRootCompany
            ? company_2.LedgerCompany.create(holder.stub.transactionDate, holder.stub.transactionHash)
            : company_2.LedgerCompany.createRoot();
        item.status = company_2.LedgerCompanyStatus.ACTIVE;
        await holder.db.company.save(item);
        let wallet = (item.wallet = new wallet_1.LedgerWallet());
        await holder.db.company.walletSet(item, wallet);
        if (!_.isNil(params.description)) {
            item.description = params.description;
            await holder.db.company.descriptionSet(item, params.description);
        }
        await holder.stub.dispatch(new company_1.CompanyAddedEvent(holder.eventData));
        await this.userAdd(holder, item.uid, params.ownerUid, Object.values(role_1.LedgerCompanyRole));
        return item;
    }
    async userAdd(holder, companyUid, userUid, roles) {
        await holder.db.user.companyAdd(userUid, companyUid);
        await holder.db.company.userAdd(companyUid, userUid);
        if (!_.isNil(roles)) {
            await holder.db.company.userRoleSet(companyUid, userUid, roles);
        }
        await holder.stub.dispatch(new company_1.CompanyUserAddedEvent(holder.eventData));
    }
};
CompanyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger])
], CompanyService);
exports.CompanyService = CompanyService;
