import { CdkTableFilterableMapCollection, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular';
import * as _ from 'lodash';
import { PipeService, UserService } from '@core/service';
import { Injectable } from '@angular/core';
import { Payment, PaymentTransaction } from '@project/common/platform/payment';

@Injectable()
export class PaymentTransactionMapCollection extends CdkTableFilterableMapCollection<PaymentTransaction, Array<PaymentTransaction>> {

    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    private _payment: Payment;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(`id`);
    }

    // --------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    // --------------------------------------------------------------------------

    private commitPaymentProperties(): void {
        this.reload();
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<Array<PaymentTransaction>> {
        return Promise.resolve(this.payment.transactions);
    }

    protected parseItem(item: PaymentTransaction): PaymentTransaction {
        return item;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.payment = null;
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    // --------------------------------------------------------------------------

    public get payment(): Payment {
        return this._payment;
    }
    public set payment(value: Payment) {
        if (value === this._payment) {
            return;
        }
        this._payment = value;
        if (!_.isNil(value)) {
            this.commitPaymentProperties();
        }
    }
}

export class PaymentTransactionTableSettings implements ICdkTableSettings<PaymentTransaction> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public isInteractive: boolean = false;

    public columns: Array<ICdkTableColumn<PaymentTransaction>>;

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService, user: UserService) {
        this.columns = [];
        this.columns.push({
            name: 'type',
            className: 'pl-3',
            headerClassName: 'pl-3',
            headerId: 'payment.transaction.type.type',
            isDisableSort: true,
            format: item => pipe.language.translate(`payment.transaction.type.${item.type}`)
        })
        if (user.isAdministrator) {
            this.columns.push({
                name: 'debet',
                headerId: 'payment.transaction.debet',
                isDisableSort: true,
                format: item => item.debet
            })
            this.columns.push({
                name: 'credit',
                headerId: 'payment.transaction.credit',
                isDisableSort: true,
                format: item => item.credit
            })
        }
        this.columns.push({
            name: 'amount',
            headerId: 'payment.transaction.amount',
            isDisableSort: true,
            format: item => pipe.amount.transform(item)
        })
        this.columns.push({
            name: 'date',
            headerId: 'payment.transaction.activatedDate',
            isDisableSort: true,
            format: item => pipe.momentDate.transform(item.activatedDate)
        });

    }
}
