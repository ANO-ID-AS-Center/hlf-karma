import { Component, ElementRef, ViewChild } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { MenuTriggerForDirective, ViewUtil } from '@ts-core/angular';
import { Transport } from '@ts-core/common/transport';
import { UserService } from '@core/service';
import * as _ from 'lodash';
import { User } from '@project/common/platform/user';
import { UserMenu } from '@feature/user/service';

@Component({
    templateUrl: 'user-page.component.html',
})
export class UserPageComponent extends DestroyableContainer {
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
        private service: UserService,
        private transport: Transport,
        public menu: UserMenu,
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
        this.menu.refresh(this.user);
        this.trigger.openMenuOn(event.target);
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get user(): User {
        return this.service.user;
    }

}
