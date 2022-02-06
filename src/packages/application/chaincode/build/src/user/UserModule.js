"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const UserService_1 = require("./service/UserService");
const UserGetHandler_1 = require("./handler/UserGetHandler");
const UserAddHandler_1 = require("./handler/UserAddHandler");
const UserListHandler_1 = require("./handler/UserListHandler");
const UserRemoveHandler_1 = require("./handler/UserRemoveHandler");
const UserCryptoKeyChangeHandler_1 = require("./handler/UserCryptoKeyChangeHandler");
const UserEditHandler_1 = require("./handler/UserEditHandler");
const UserProjectListHandler_1 = require("./handler/UserProjectListHandler");
const UserCompanyListHandler_1 = require("./handler/UserCompanyListHandler");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            UserGetHandler_1.UserGetHandler,
            UserAddHandler_1.UserAddHandler,
            UserListHandler_1.UserListHandler,
            UserEditHandler_1.UserEditHandler,
            UserRemoveHandler_1.UserRemoveHandler,
            UserCompanyListHandler_1.UserCompanyListHandler,
            UserProjectListHandler_1.UserProjectListHandler,
            UserCryptoKeyChangeHandler_1.UserCryptoKeyChangeHandler,
        ],
        providers: [UserService_1.UserService],
        exports: [UserService_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
