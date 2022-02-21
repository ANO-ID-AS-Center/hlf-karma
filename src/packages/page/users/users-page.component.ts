import { Component, ElementRef, ViewChild } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ICdkTableCellEvent, ICdkTableSettings, MenuTriggerForDirective, ViewUtil } from '@ts-core/angular';
import { UserRemovedEvent, UserAddedEvent } from '@common/transport/event/user';
import { takeUntil } from 'rxjs/operators';
import { merge, delay } from 'rxjs';
import { DateUtil } from '@ts-core/common/util';
import { Transport } from '@ts-core/common/transport';
import { LedgerUser } from '@common/ledger/user';
import { PipeService, UserService } from '@core/service';
import { UserMapCollection, UserTableSettings } from '@core/lib/user';
import * as _ from 'lodash';
import { title } from 'process';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { User } from '@common/platform/user';

@Component({
    templateUrl: 'users-page.component.html',
})
export class UsersPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;

    public settings: ICdkTableSettings<User>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        element: ElementRef,
        pipe: PipeService,
        user: UserService,
        private transport: Transport,
        public items: UserMapCollection
    ) {
        super();
        ViewUtil.addClasses(element, 'd-block background border rounded');

        this.settings = new UserTableSettings(pipe, user);
        if (!this.items.isDirty) {
            this.items.reload();
        }

        /*
        merge(api.monitor.getEventDispatcher(UserAddedEvent.NAME), api.monitor.getEventDispatcher(UserRemovedEvent.NAME))
            .pipe(delay(DateUtil.MILISECONDS_SECOND), takeUntil(this.destroyed))
            .subscribe(() => this.items.reload());
        */
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public async add(): Promise<void> {
        // this.transport.send(new UserAddCommand());
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<LedgerUser>): Promise<void> {
        if (item.column !== UserTableSettings.COLUMN_NAME_MENU) {
            // this.transport.send(new UserOpenCommand(item.data));
        }
        else {
            // this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }

}
