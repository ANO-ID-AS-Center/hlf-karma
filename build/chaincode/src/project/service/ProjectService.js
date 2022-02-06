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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const role_1 = require("@project/common/ledger/role");
const _ = require("lodash");
const wallet_1 = require("@project/common/ledger/wallet");
const project_1 = require("@project/common/ledger/project");
const project_2 = require("@project/common/transport/event/project");
let ProjectService = class ProjectService extends logger_1.LoggerWrapper {
    constructor(logger) {
        super(logger);
    }
    async add(holder, params) {
        let item = project_1.LedgerProject.create(holder.stub.transactionDate, holder.stub.transactionHash);
        item.status = project_1.LedgerProjectStatus.ACTIVE;
        item.companyUid = params.companyUid;
        await holder.db.project.save(item);
        let wallet = (item.wallet = new wallet_1.LedgerWallet());
        await holder.db.project.walletSet(item, wallet);
        if (!_.isNil(params.description)) {
            params.description = params.description;
            await holder.db.project.descriptionSet(item, params.description);
        }
        await holder.stub.dispatch(new project_2.ProjectAddedEvent(holder.eventData));
        await this.companyAdd(holder, item.uid, params.companyUid);
        await this.userAdd(holder, item.uid, params.ownerUid, Object.values(role_1.LedgerProjectRole));
        return item;
    }
    async companyAdd(holder, projectUid, companyUid) {
        await holder.db.company.projectAdd(companyUid, projectUid);
        await holder.db.project.companyAdd(projectUid, companyUid);
    }
    async userAdd(holder, projectUid, userUid, roles) {
        await holder.db.user.projectAdd(userUid, projectUid);
        await holder.db.project.userAdd(projectUid, userUid);
        if (!_.isNil(roles)) {
            await holder.db.project.userRoleSet(projectUid, userUid, roles);
        }
        await holder.stub.dispatch(new project_2.ProjectUserAddedEvent(holder.eventData));
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger])
], ProjectService);
exports.ProjectService = ProjectService;
