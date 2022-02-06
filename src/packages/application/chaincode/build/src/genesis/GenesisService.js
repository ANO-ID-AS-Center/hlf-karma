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
var GenesisService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisService = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const UserService_1 = require("../user/service/UserService");
const fabric_shim_1 = require("fabric-shim");
const guard_1 = require("@project/module/core/guard");
const role_1 = require("@project/common/ledger/role");
const user_1 = require("@project/common/ledger/user");
const CompanyService_1 = require("../company/service/CompanyService");
const util_1 = require("@ts-core/common/util");
const command_1 = require("@project/common/transport/command");
const stub_1 = require("@hlf-core/transport/chaincode/stub");
const chaincode_1 = require("@hlf-core/transport/chaincode");
const crypto_1 = require("@ts-core/common/transport/crypto");
let GenesisService = GenesisService_1 = class GenesisService extends logger_1.LoggerWrapper {
    user;
    company;
    chaincode;
    static KEY = 'GENESIS';
    static ROOT_USER_CRYPTO_KEY = 'e365007e85508c6b44d5101a1d59d0061a48fd1bcd393186ccb5e7ae938a59a8';
    static ROOT_USER_DESCRIPTION = 'ROOT_USER';
    static ROOT_USER_CRYPTO_ALGORITHM = crypto_1.TransportCryptoManagerEd25519.ALGORITHM;
    static ROOT_COMPANY_DESCRIPTION = 'ROOT_COMPANY';
    constructor(logger, user, company, chaincode) {
        super(logger);
        this.user = user;
        this.company = company;
        this.chaincode = chaincode;
    }
    holderGet(stub) {
        let transport = this.stubGet(stub);
        let db = new guard_1.DBManager(this.logger, transport);
        let destroy = () => db.destroy();
        return {
            id: null,
            name: null,
            stub: transport,
            user: user_1.LedgerUser.createRoot(),
            db,
            destroy
        };
    }
    stubGet(stub) {
        return new stub_1.TransportFabricStub(stub, null, { userId: user_1.LedgerUser.createRoot().uid, signature: { nonce: null, value: null, algorithm: null, publicKey: null } }, this.chaincode);
    }
    async get(stub) {
        if (stub instanceof fabric_shim_1.ChaincodeStub) {
            stub = this.stubGet(stub);
        }
        return stub.getState(GenesisService_1.KEY);
    }
    async add(stub) {
        let holder = this.holderGet(stub);
        let user = await this.user.add(holder, {
            roles: Object.values(role_1.LedgerRole),
            description: GenesisService_1.ROOT_USER_DESCRIPTION,
            cryptoKey: { value: GenesisService_1.ROOT_USER_CRYPTO_KEY, algorithm: GenesisService_1.ROOT_USER_CRYPTO_ALGORITHM }
        }, true);
        let company = await this.company.add(holder, { description: GenesisService_1.ROOT_COMPANY_DESCRIPTION, ownerUid: user.uid }, true);
        return holder.stub.putState(GenesisService_1.KEY, util_1.TransformUtil.toClass(command_1.Genesis, {
            rootUserUid: user.uid,
            rootCompanyUid: company.uid,
            createdDate: holder.stub.transactionDate
        }), true, true);
    }
};
GenesisService = GenesisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger,
        UserService_1.UserService,
        CompanyService_1.CompanyService,
        chaincode_1.TransportFabricChaincodeReceiver])
], GenesisService);
exports.GenesisService = GenesisService;
