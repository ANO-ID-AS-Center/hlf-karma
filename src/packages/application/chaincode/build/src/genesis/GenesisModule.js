"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GenesisModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisModule = void 0;
const common_1 = require("@nestjs/common");
const GenesisGetHandler_1 = require("./GenesisGetHandler");
const GenesisService_1 = require("./GenesisService");
const UserModule_1 = require("../user/UserModule");
const CompanyModule_1 = require("../company/CompanyModule");
let GenesisModule = GenesisModule_1 = class GenesisModule {
};
GenesisModule = GenesisModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [UserModule_1.UserModule, CompanyModule_1.CompanyModule, GenesisModule_1],
        controllers: [GenesisGetHandler_1.GenesisGetHandler],
        providers: [GenesisService_1.GenesisService],
        exports: [GenesisService_1.GenesisService]
    })
], GenesisModule);
exports.GenesisModule = GenesisModule;
