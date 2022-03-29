import { Component, ElementRef, ViewChild } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ICdkTableCellEvent, ICdkTableSettings, MenuTriggerForDirective, ViewUtil } from '@ts-core/angular';
import { PipeService, UserService } from '@core/service';
import * as _ from 'lodash';
import { PaymentMapCollection, PaymentTableSettings } from '@core/lib/payment';
// import { PaymentMenu } from '@feature/payment/service';
import { Transport } from '@ts-core/common/transport';
import { PaymentOpenCommand } from '@feature/payment/transport';
import { Payment } from '@project/common/platform/payment';

@Component({
    templateUrl: 'payments-page.component.html',
})
export class PaymentsPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    @ViewChild(MenuTriggerForDirective, { static: true })
    public trigger: MenuTriggerForDirective;
    public settings: ICdkTableSettings<Payment>;

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
        // public menu: PaymentMenu,
        public items: PaymentMapCollection
    ) {
        super();
        ViewUtil.addClasses(element, 'd-block background border rounded');

        this.settings = new PaymentTableSettings(pipe, user);
        if (!this.items.isDirty) {
            this.items.reload();
        }
    }

    // --------------------------------------------------------------------------
    //
    // 	Event Handlers
    //
    // --------------------------------------------------------------------------

    public async cellClickedHandler(item: ICdkTableCellEvent<Payment>): Promise<void> {
        if (item.column !== PaymentTableSettings.COLUMN_NAME_MENU) {
            // this.transport.send(new PaymentOpenCommand(item.data.id));
        }
        else {
            // this.menu.refresh(item.data);
            this.trigger.openMenuOn(item.event.target);
        }
    }

}
