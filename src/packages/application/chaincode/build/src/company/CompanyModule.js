"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyModule = void 0;
const common_1 = require("@nestjs/common");
const CompanyService_1 = require("./service/CompanyService");
const CompanyGetHandler_1 = require("./handler/CompanyGetHandler");
const CompanyAddHandler_1 = require("./handler/CompanyAddHandler");
const CompanyListHandler_1 = require("./handler/CompanyListHandler");
const CompanyRemoveHandler_1 = require("./handler/CompanyRemoveHandler");
const CompanyUserAddHandler_1 = require("./handler/CompanyUserAddHandler");
const CompanyEditHandler_1 = require("./handler/CompanyEditHandler");
const CompanyUserListHandler_1 = require("./handler/CompanyUserListHandler");
const CompanyUserEditHandler_1 = require("./handler/CompanyUserEditHandler");
const CompanyUserRemoveHandler_1 = require("./handler/CompanyUserRemoveHandler");
const CompanyUserRoleListHandler_1 = require("./handler/CompanyUserRoleListHandler");
const CompanyProjectListHandler_1 = require("./handler/CompanyProjectListHandler");
let CompanyModule = class CompanyModule {
};
CompanyModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            CompanyGetHandler_1.CompanyGetHandler,
            CompanyListHandler_1.CompanyListHandler,
            CompanyAddHandler_1.CompanyAddHandler,
            CompanyEditHandler_1.CompanyEditHandler,
            CompanyRemoveHandler_1.CompanyRemoveHandler,
            CompanyProjectListHandler_1.CompanyProjectListHandler,
            CompanyUserAddHandler_1.CompanyUserAddHandler,
            CompanyUserListHandler_1.CompanyUserListHandler,
            CompanyUserRemoveHandler_1.CompanyUserRemoveHandler,
            CompanyUserEditHandler_1.CompanyUserEditHandler,
            CompanyUserRoleListHandler_1.CompanyUserRoleListHandler
        ],
        providers: [CompanyService_1.CompanyService],
        exports: [CompanyService_1.CompanyService]
    })
], CompanyModule);
exports.CompanyModule = CompanyModule;
