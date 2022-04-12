import { Component, Input, ViewContainerRef } from '@angular/core';
import { ICdkTableCellEvent, ICdkTableSettings, ViewUtil } from '@ts-core/angular';
import * as _ from 'lodash';
import { PaymentBaseComponent } from '../PaymentBaseComponent';
import { PaymentTransactionMapCollection, PaymentTransactionTableSettings } from '@core/lib/payment';
import { PipeService, UserService } from '@core/service';
import { Transport } from '@ts-core/common/transport';
import { Payment, PaymentTransaction } from '@project/common/platform/payment';

@Component({
    selector: 'payment-transactions',
    templateUrl: 'payment-transactions.component.html',
    providers: [PaymentTransactionMapCollection]
})
export class PaymentTransactionsComponent extends PaymentBaseComponent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public settings: ICdkTableSettings<PaymentTransaction>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(container: ViewContainerRef,
        private pipe: PipeService,
        private user: UserService,
        private transport: Transport,
        public items: PaymentTransactionMapCollection
    ) {
        super(container);
        ViewUtil.addClasses(container, 'd-flex');
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    protected commitPaymentProperties(): void {
        super.commitPaymentProperties();

        this.settings = new PaymentTransactionTableSettings(this.pipe, this.user);

        this.items.payment = this.payment;
        this.items.reload();
    }


    protected commitSettingsProperties(): void {

    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();

        if (!_.isNil(this.items)) {
            this.items.destroy();
            this.items = null;
        }

        this.settings = null;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get payment(): Payment {
        return super.payment;
    }
    @Input()
    public set payment(value: Payment) {
        super.payment = value;
    }

}
