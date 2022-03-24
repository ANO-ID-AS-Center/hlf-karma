import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';
import { Company } from '@common/platform/company';
import { CompanyBaseComponent } from '../CompanyBaseComponent';
import { UserCompany } from '@project/common/platform/user';

@Component({
    selector: 'company-nalog-preferences',
    templateUrl: 'company-nalog-preferences.component.html'
})
export class CompanyNalogPreferencesComponent extends CompanyBaseComponent {

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get company(): UserCompany {
        return super.company;
    }
    @Input()
    public set company(value: UserCompany) {
        super.company = value;
    }
}
