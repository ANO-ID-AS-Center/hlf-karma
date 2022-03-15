import { Component, ElementRef, ViewChild } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { MenuTriggerForDirective, ViewUtil } from '@ts-core/angular';
import { Transport } from '@ts-core/common/transport';
import { UserService, CompanyService } from '@core/service';
import * as _ from 'lodash';
import { Company } from '@project/common/platform/company';
import { CompanyMenu } from '@feature/company/service';

@Component({
    templateUrl: 'company-page.component.html',
})
export class CompanyPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        element: ElementRef,
        private user: UserService,
        private service: CompanyService,
        private transport: Transport,
        public menu: CompanyMenu,
    ) {
        super();
        ViewUtil.addClasses(element, 'd-flex scroll-vertical w-100 h-100');
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------


    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async menuOpen(event: MouseEvent): Promise<void> {
        this.menu.refresh(this.company);
        this.trigger.openMenuOn(event.target);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get company(): Company {
        return this.service.company;
    }

}
