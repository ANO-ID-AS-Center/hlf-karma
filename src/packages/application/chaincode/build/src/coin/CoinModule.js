"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinModule = void 0;
const common_1 = require("@nestjs/common");
const CoinBurnHandler_1 = require("./handler/CoinBurnHandler");
const CoinEmitHandler_1 = require("./handler/CoinEmitHandler");
const CoinTransferHandler_1 = require("./handler/CoinTransferHandler");
const CoinService_1 = require("./service/CoinService");
let CoinModule = class CoinModule {
};
CoinModule = __decorate([
    (0, common_1.Module)({
        controllers: [CoinEmitHandler_1.CoinEmitHandler, CoinBurnHandler_1.CoinBurnHandler, CoinTransferHandler_1.CoinTransferHandler],
        providers: [CoinService_1.CoinService]
    })
], CoinModule);
exports.CoinModule = CoinModule;
