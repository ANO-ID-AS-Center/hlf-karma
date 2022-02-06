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
exports.Chaincode = void 0;
const common_1 = require("@nestjs/common");
const logger_1 = require("@ts-core/common/logger");
const _ = require("lodash");
const GenesisService_1 = require("./genesis/GenesisService");
const chaincode_1 = require("@hlf-core/transport/chaincode");
let Chaincode = class Chaincode extends chaincode_1.TransportFabricChaincode {
    genesis;
    constructor(logger, transport, genesis) {
        super(logger, transport);
        this.genesis = genesis;
    }
    async Init(stub) {
        let item = await this.genesis.get(stub);
        if (!_.isNil(item)) {
            this.log(`Genesis data already exists`);
            return super.Init(stub);
        }
        await this.genesis.add(stub);
        this.log(`Genesis data successfully added`);
        return super.Init(stub);
    }
    get name() {
        return `Karma chaincode`;
    }
};
Chaincode = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.Logger, chaincode_1.TransportFabricChaincodeReceiver, GenesisService_1.GenesisService])
], Chaincode);
exports.Chaincode = Chaincode;
