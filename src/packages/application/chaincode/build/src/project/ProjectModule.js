"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const ProjectGetHandler_1 = require("./handler/ProjectGetHandler");
const ProjectAddHandler_1 = require("./handler/ProjectAddHandler");
const ProjectListHandler_1 = require("./handler/ProjectListHandler");
const ProjectEditHandler_1 = require("./handler/ProjectEditHandler");
const ProjectRemoveHandler_1 = require("./handler/ProjectRemoveHandler");
const ProjectUserAddHandler_1 = require("./handler/ProjectUserAddHandler");
const ProjectUserEditHandler_1 = require("./handler/ProjectUserEditHandler");
const ProjectUserListHandler_1 = require("./handler/ProjectUserListHandler");
const ProjectUserRemoveHandler_1 = require("./handler/ProjectUserRemoveHandler");
const ProjectUserRoleListHandler_1 = require("./handler/ProjectUserRoleListHandler");
const ProjectService_1 = require("./service/ProjectService");
let ProjectModule = class ProjectModule {
};
ProjectModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            ProjectListHandler_1.ProjectListHandler,
            ProjectEditHandler_1.ProjectEditHandler,
            ProjectGetHandler_1.ProjectGetHandler,
            ProjectAddHandler_1.ProjectAddHandler,
            ProjectRemoveHandler_1.ProjectRemoveHandler,
            ProjectUserAddHandler_1.ProjectUserAddHandler,
            ProjectUserEditHandler_1.ProjectUserEditHandler,
            ProjectUserListHandler_1.ProjectUserListHandler,
            ProjectUserRemoveHandler_1.ProjectUserRemoveHandler,
            ProjectUserRoleListHandler_1.ProjectUserRoleListHandler
        ],
        providers: [ProjectService_1.ProjectService],
        exports: [ProjectService_1.ProjectService]
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
