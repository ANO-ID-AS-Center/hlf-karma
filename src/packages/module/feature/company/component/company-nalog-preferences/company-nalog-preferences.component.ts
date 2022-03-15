import { Component, Input, ViewContainerRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';
import { } from '@common/platform/company';
import { CompanyPreferences } from '@project/common/platform/company';
import { DestroyableContainer } from '@ts-core/common';

@Component({
    selector: 'company-nalog-preferences',
    templateUrl: 'company-nalog-preferences.component.html'
})
export class CompanyNalogPreferencesComponent extends DestroyableContainer {

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @Input()
    public isDisabled: boolean;
    @Input()
    public preferences: CompanyPreferences;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef) {
        super();
        ViewUtil.addClasses(container.element, 'd-block');
    }


}
