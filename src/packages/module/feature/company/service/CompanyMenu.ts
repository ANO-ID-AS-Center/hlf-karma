import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common/transport';
import { UserService } from '@core/service';
import { UserCompany } from '@project/common/platform/user';
import { LedgerCompanyRole } from '@project/common/ledger/role';
import { CompanyStatus } from '@project/common/platform/company';
import { CompanyVerifyCommand, CompanyToVerifyCommand, CompanyRejectCommand, CompanyActivateCommand } from '../transport';
import { ProjectAddCommand } from '@feature/project/transport';


@Injectable({ providedIn: 'root' })
export class CompanyMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static TO_VERIFY = 10;
    private static VERIFY = 20;
    private static REJECT = 30;
    private static ACTIVATE = 40;

    private static PROJECT_ADD = 50;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, private user: UserService) {
        super(language);

        let item: MenuListItem = null;

        item = new ListItem('company.action.toVerify.toVerify', CompanyMenu.TO_VERIFY, null, 'fas fa-arrow-right mr-2');
        item.checkEnabled = (item, company) => this.isCanToVerify(company);
        item.action = (item, company) => transport.send(new CompanyToVerifyCommand());
        item.className = 'text-success';
        this.add(item);

        item = new ListItem('company.action.activate.activate', CompanyMenu.ACTIVATE, null, 'fas fa-check mr-2');
        item.checkEnabled = (item, company) => this.isCanActivate(company);
        item.action = (item, company) => transport.send(new CompanyActivateCommand());
        item.className = 'text-success';
        this.add(item);

        item = new ListItem('company.action.verify.verify', CompanyMenu.VERIFY, null, 'fas fa-check mr-2');
        item.checkEnabled = (item, company) => this.isCanVerify(company);
        item.action = (item, company) => transport.send(new CompanyVerifyCommand(company));
        item.className = 'text-success';
        this.add(item);

        item = new ListItem('company.action.reject.reject', CompanyMenu.REJECT, null, 'fas fa-times mr-2');
        item.checkEnabled = (item, company) => this.isCanReject(company);
        item.action = (item, company) => transport.send(new CompanyRejectCommand(company));
        item.className = 'text-danger';
        this.add(item);

        item = new ListItem('project.action.add.add', CompanyMenu.PROJECT_ADD, null, 'fas fa-cube mr-2');
        item.checkEnabled = (item, company) => this.isCanProjectAdd(company);
        item.action = (item, company) => transport.send(new ProjectAddCommand());
        this.add(item);

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isCanVerify(company: UserCompany): boolean {
        return company.status === CompanyStatus.VERIFICATION_PROCESS && (this.user.isEditor || this.user.isAdministrator);
    }

    private isCanReject(company: UserCompany): boolean {
        return company.status === CompanyStatus.VERIFICATION_PROCESS && (this.user.isEditor || this.user.isAdministrator);
    }

    private isCanActivate(company: UserCompany): boolean {
        if (_.isEmpty(company.roles)) {
            return false;
        }
        return company.status === CompanyStatus.VERIFIED && company.roles.includes(LedgerCompanyRole.COMPANY_MANAGER);
    }
    private isCanToVerify(company: UserCompany): boolean {
        if (_.isEmpty(company.roles)) {
            return false;
        }
        return (company.status === CompanyStatus.DRAFT || company.status === CompanyStatus.REJECTED) &&
            (company.roles.includes(LedgerCompanyRole.COMPANY_MANAGER));
    }
    private isCanProjectAdd(company: UserCompany): boolean {
        return company.status === CompanyStatus.ACTIVE && company.roles.includes(LedgerCompanyRole.PROJECT_MANAGER)
    }
}

class MenuListItem extends ListItem<void> {
    action: (item: ListItem, company: UserCompany) => void;
    checkEnabled: (item: ListItem, company: UserCompany) => boolean;
}
