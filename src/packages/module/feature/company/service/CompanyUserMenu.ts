import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common/transport';
import { UserService } from '@core/service';
import { UserCompany } from '@project/common/platform/user';
import { LedgerCompanyRole } from '@project/common/ledger/role';
import { CompanyStatus, CompanyUser } from '@project/common/platform/company';
import { CompanyVerifyCommand, CompanyToVerifyCommand, CompanyRejectCommand, CompanyActivateCommand, CompanyUserRoleEditCommand } from '../transport';
import { ProjectAddCommand } from '@feature/project/transport';
import { PermissionUtil } from '@project/common/util';


@Injectable({ providedIn: 'root' })
export class CompanyUserMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static ROLE_EDIT = 10;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, private user: UserService) {
        super(language);

        let item: MenuListItem = null;

        item = new ListItem('user.action.roleEdit.roleEdit', CompanyUserMenu.ROLE_EDIT, null, 'fas fa-user-tag mr-2');
        item.checkEnabled = (item, company, user) => this.isCanRole(company, user);
        item.action = (item, company, user) => transport.send(new CompanyUserRoleEditCommand({ companyId: company.id, userId: user.id }));
        this.add(item);

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isCanRole(company: UserCompany, user: CompanyUser): boolean {
        return PermissionUtil.isCanCompanyUserEdit(company.roles);
    }
}

class MenuListItem extends ListItem<void> {
    action: (item: ListItem, company: UserCompany, user: CompanyUser) => void;
    checkEnabled: (item: ListItem, company: UserCompany, user: CompanyUser) => boolean;
}
