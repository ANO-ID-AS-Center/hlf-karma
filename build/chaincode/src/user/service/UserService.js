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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const user_1 = require("@project/common/ledger/user");
const util_1 = require("@ts-core/common/util");
const cryptoKey_1 = require("@project/common/ledger/cryptoKey");
const _ = require("lodash");
const user_2 = require("@project/common/transport/event/user");
let UserService = class UserService extends logger_1.LoggerWrapper {
    constructor(logger) {
        super(logger);
    }
    async add(holder, params, isDefaultRootUser) {
        let item = !isDefaultRootUser
            ? user_1.LedgerUser.create(holder.stub.transactionDate, holder.stub.transactionHash)
            : user_1.LedgerUser.createRoot();
        item.status = user_1.LedgerUserStatus.ACTIVE;
        await holder.db.user.save(item);
        let cryptoKey = new cryptoKey_1.LedgerCryptoKey();
        util_1.ObjectUtil.copyProperties(params.cryptoKey, cryptoKey);
        await holder.db.user.cryptoKeySet(item, cryptoKey);
        if (!_.isNil(params.description)) {
            await holder.db.user.descriptionSet(item, params.description);
        }
        if (!_.isEmpty(params.roles)) {
            await holder.db.user.roleSet(item, params.roles);
        }
        await holder.stub.dispatch(new user_2.UserAddedEvent(holder.eventData));
        return item;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger])
], UserService);
exports.UserService = UserService;
