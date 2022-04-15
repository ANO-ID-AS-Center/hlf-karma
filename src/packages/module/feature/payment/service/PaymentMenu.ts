import { ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common/transport';
import { UserService } from '@core/service';
import { Payment } from '@project/common/platform/payment';
import { UserOpenCommand } from '@feature/user/transport';
import { CompanyOpenCommand } from '@feature/company/transport';
import { ProjectOpenCommand } from '@feature/project/transport';


@Injectable({ providedIn: 'root' })
export class PaymentMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static USER = 10;
    private static COMPANY = 20;
    private static PROJECT = 30;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, private user: UserService) {
        super(language);

        let item: MenuListItem = null;

        item = new ListItem('user.user', PaymentMenu.USER, null, 'fas fa-user mr-2');
        item.checkEnabled = (item, payment) => !_.isNil(payment.userId);
        item.action = (item, payment) => transport.send(new UserOpenCommand(payment.userId));
        this.add(item);

        /*
        item = new ListItem('company.company', PaymentMenu.COMPANY, null, 'fas fa-building mr-2');
        item.checkEnabled = (item, payment) => !_.isNil(payment.companyId);
        item.action = (item, payment) => transport.send(new CompanyOpenCommand(payment.companyId));
        this.add(item);

        item = new ListItem('project.project', PaymentMenu.PROJECT, null, 'fas fa-hands-helping mr-2');
        item.checkEnabled = (item, payment) => !_.isNil(payment.projectId);
        item.action = (item, payment) => transport.send(new ProjectOpenCommand(payment.projectId));
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
    */

        this.complete();
    }

    // --------------------------------------------------------------------------
    //
    //	Private Methods
    //
    // --------------------------------------------------------------------------

    private isCanVerify(payment: Payment): boolean {
        return true;
    }

}

class MenuListItem extends ListItem<void> {
    action: (item: ListItem, company: Payment) => void;
    checkEnabled: (item: ListItem, company: Payment) => boolean;
}
