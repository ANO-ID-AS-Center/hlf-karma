import { ISelectListItem, SelectListItem, SelectListItems } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { UserService, CompanyService, RouterService } from '@core/service';
import { takeUntil } from 'rxjs';
import { CompanyGuard, CompaniesGuard } from '@feature/company/guard';
import { merge } from 'rxjs';
import { UsersGuard } from '@feature/user/guard';

@Injectable()
export class ShellMenu extends SelectListItems<ISelectListItem<string>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static USERS = 0;
    private static USER = 9;
    private static COMPANY = 10;
    private static COMPANIES = 20;

    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, user: UserService, company: CompanyService, router: RouterService, usersGuard: UsersGuard, companyGuard: CompanyGuard, companiesGuard: CompaniesGuard) {
        super(language);

        let item: ISelectListItem = null;

        item = this.add(new ShellListItem('user.users', ShellMenu.USERS, `/${RouterService.USERS_URL}`, 'fas fa-users'));
        item.checkEnabled = () => usersGuard.canActivate() === true;

        item = this.add(new ShellListItem('user.user', ShellMenu.USER, `/${RouterService.USER_URL}`, 'fas fa-user'));

        item = this.add(new ShellListItem('company.company', ShellMenu.COMPANY, `/${RouterService.COMPANY_URL}`, 'fas fa-building'));
        item.checkEnabled = () => companyGuard.canActivate() === true;

        item = this.add(new ShellListItem('company.companies', ShellMenu.COMPANIES, `/${RouterService.COMPANIES_URL}`, 'fas fa-building-columns'));
        item.checkEnabled = () => companiesGuard.canActivate() === true;

        for (let item of this.collection) {
            item.action = item => router.navigate(item.data);
            item.checkSelected = item => router.isUrlActive(item.data, false);
        }
        merge(company.changed, user.logined, user.changed).pipe(takeUntil(this.destroyed)).subscribe(() => this.refresh());
        merge(router.finished).pipe(takeUntil(this.destroyed)).subscribe(() => this.refreshSelection());

        this.complete();
        this.refresh();
    }
}

export class ShellListItem extends SelectListItem<string> {
    constructor(translationId: string, sortIndex: number, url: string, iconId: string, className?: string) {
        super(translationId, sortIndex, url);
        this.iconId = iconId;
        this.className = className;
        this.selectedClassName = 'active';
    }
}
