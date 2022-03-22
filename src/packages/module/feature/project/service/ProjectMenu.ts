import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common/transport';
import { UserService } from '@core/service';
import { UserProject } from '@project/common/platform/user';
import { LedgerProjectRole } from '@project/common/ledger/role';
import { ProjectStatus } from '@project/common/platform/project';
import { ProjectVerifyCommand, ProjectToVerifyCommand, ProjectRejectCommand, ProjectActivateCommand } from '../transport';

@Injectable({ providedIn: 'root' })
export class ProjectMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static TO_VERIFY = 10;
    private static VERIFY = 20;
    private static REJECT = 30;
    private static ACTIVATE = 40;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, private user: UserService) {
        super(language);

        let item: MenuListItem = null;

        item = new ListItem('project.action.toVerify.toVerify', ProjectMenu.TO_VERIFY, null, 'fas fa-arrow-right mr-2');
        item.checkEnabled = (item, project) => this.isCanToVerify(project);
        item.action = (item, project) => transport.send(new ProjectToVerifyCommand(project));
        item.className = 'text-success';
        this.add(item);

        item = new ListItem('project.action.activate.activate', ProjectMenu.ACTIVATE, null, 'fas fa-check mr-2');
        item.checkEnabled = (item, project) => this.isCanActivate(project);
        item.action = (item, project) => transport.send(new ProjectActivateCommand(project));
        item.className = 'text-success';
        this.add(item);

        item = new ListItem('project.action.verify.verify', ProjectMenu.VERIFY, null, 'fas fa-check mr-2');
        item.checkEnabled = (item, project) => this.isCanVerify(project);
        item.action = (item, project) => transport.send(new ProjectVerifyCommand(project));
        item.className = 'text-success';
        this.add(item);

        item = new ListItem('project.action.reject.reject', ProjectMenu.REJECT, null, 'fas fa-times mr-2');
        item.checkEnabled = (item, project) => this.isCanReject(project);
        item.action = (item, project) => transport.send(new ProjectRejectCommand(project));
        item.className = 'text-danger';
        this.add(item);

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isCanVerify(project: UserProject): boolean {
        return project.status === ProjectStatus.VERIFICATION_PROCESS && (this.user.isEditor || this.user.isAdministrator);
    }

    private isCanReject(project: UserProject): boolean {
        return project.status === ProjectStatus.VERIFICATION_PROCESS && (this.user.isEditor || this.user.isAdministrator);
    }

    private isCanActivate(project: UserProject): boolean {
        if (_.isEmpty(project.roles)) {
            return false;
        }
        return project.status === ProjectStatus.VERIFIED && project.roles.includes(LedgerProjectRole.PROJECT_MANAGER);
    }
    private isCanToVerify(project: UserProject): boolean {
        if (_.isEmpty(project.roles)) {
            return false;
        }
        return (project.status === ProjectStatus.DRAFT || project.status === ProjectStatus.REJECTED) &&
            (project.roles.includes(LedgerProjectRole.PROJECT_MANAGER));
    }
}

class MenuListItem extends ListItem<void> {
    action: (item: ListItem, project: UserProject) => void;
    checkEnabled: (item: ListItem, project: UserProject) => boolean;
}
