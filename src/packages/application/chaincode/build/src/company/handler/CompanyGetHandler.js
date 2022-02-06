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
exports.CompanyGetHandler = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const util_1 = require("@ts-core/common/util");
const _ = require("lodash");
const company_1 = require("@project/common/transport/command/company");
const guard_1 = require("@project/module/core/guard");
const error_1 = require("@project/common/ledger/error");
const chaincode_1 = require("@hlf-core/transport/chaincode");
const handler_1 = require("@hlf-core/transport/chaincode/handler");
const stub_1 = require("@hlf-core/transport/chaincode/stub");
let CompanyGetHandler = class CompanyGetHandler extends handler_1.TransportCommandFabricAsyncHandler {
    constructor(logger, transport) {
        super(logger, transport, company_1.CompanyGetCommand.NAME);
    }
    async execute(params, holder) {
        let item = await holder.db.company.get(params.uid, params.details);
        if (_.isNil(item)) {
            throw new error_1.LedgerError(error_1.LedgerErrorCode.NOT_FOUND, `Unable to find company "${params.uid}"`);
        }
        return item;
    }
    checkResponse(response) {
        return util_1.TransformUtil.fromClass(response);
    }
};
__decorate([
    (0, guard_1.UserGuard)({ isNeedCheck: false }),
    __param(1, (0, stub_1.StubHolder)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyGetHandler.prototype, "execute", null);
CompanyGetHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger, chaincode_1.TransportFabricChaincodeReceiver])
], CompanyGetHandler);
exports.CompanyGetHandler = CompanyGetHandler;
