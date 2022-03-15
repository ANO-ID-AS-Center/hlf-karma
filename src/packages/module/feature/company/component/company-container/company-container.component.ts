import { Component, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';
import { Company } from '@common/platform/company';
import { CompanyBaseComponent } from '../CompanyBaseComponent';

@Component({
    selector: 'company-container',
    templateUrl: 'company-container.component.html'
})
export class CompanyContainerComponent extends CompanyBaseComponent {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    private _company: Company;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef) {
        super(container);
        ViewUtil.addClasses(container, 'd-block');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitCompanyProperties(): void {
        let value = null;
        this._preferences = this.company.preferences;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.company = null;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get company(): Company {
        return this._company;
    }
    @Input()
    public set company(value: Company) {
        if (value === this._company) {
            return;
        }
        this._company = value;
        if (!_.isNil(value)) {
            this.commitCompanyProperties();
        }
    }
}
