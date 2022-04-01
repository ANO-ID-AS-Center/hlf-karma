import { Payment } from '@common/platform/payment';
import { CdkTablePaginableMapCollection, ICdkTableColumn, ICdkTableSettings, PrettifyPipe } from '@ts-core/angular';
import { IPagination } from '@ts-core/common/dto';
import * as _ from 'lodash';
import { Client } from '@common/platform/api';
import { PipeService, UserService } from '@core/service';
import { Injectable } from '@angular/core';
import { TransformUtil } from '@ts-core/common/util';
import { PaymentStatus } from '@project/common/platform/payment';

@Injectable()
export class PaymentMapCollection extends CdkTablePaginableMapCollection<Payment, Payment> {

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client) {
        super(`id`);
        this.sort.createdDate = false;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<Payment>> {
        return this.api.paymentList(this.createRequestData() as any);
    }

    protected parseItem(item: Payment): Payment {
        return TransformUtil.toClass(Payment, item);
    }
}

export class PaymentTableSettings implements ICdkTableSettings<Payment> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<Payment>>;
    public static COLUMN_NAME_MENU = 'menu';

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(type: PaymentTableSettingsType, pipe: PipeService) {
        this.columns = [];

        this.columns.push({
            name: PaymentTableSettings.COLUMN_NAME_MENU,
            headerId: '',
            headerClassName: 'pl-3',
            className: 'pl-3 fas fa-ellipsis-v',
            isDisableSort: true,
        });
        this.columns.push({
            name: 'amount',
            headerId: 'payment.amount',
            headerClassName: 'pl-3',
            format: item => pipe.paymentAmount.transform(item)
        })
        this.columns.push({
            name: 'userId',
            headerId: 'user.user',
            headerClassName: 'pl-3',
            isDisableSort: true,
            format: item => pipe.userTitle.transform(item.user)
        })
        if (type === PaymentTableSettingsType.ALL) {
            this.columns.push({
                name: 'companyId',
                headerId: 'company.company',
                format: item => !_.isNil(item.company) ? item.company.preferences.title : PrettifyPipe.EMPTY_SYMBOL
            })
            this.columns.push({
                name: 'type',
                headerId: 'payment.aggregator.aggregator',
                format: item => pipe.language.translate(`payment.aggregator.type.${item.type}`)
            })
            this.columns.push({
                name: 'status',
                headerId: 'payment.status.status',
                className: item => {
                    switch (item.status) {
                        case PaymentStatus.AUTHORIZED:
                            return 'text-warning';
                    }
                    return null;
                },
                format: item => pipe.language.translate(`payment.status.${item.status}`)
            })
        }
        if (type === PaymentTableSettingsType.ALL || type === PaymentTableSettingsType.COMPANY) {
            this.columns.push({
                name: 'projectId',
                headerId: 'project.project',
                format: item => !_.isNil(item.project) ? item.project.preferences.title : PrettifyPipe.EMPTY_SYMBOL
            })
        }

        this.columns.push({
            name: 'createdDate',
            headerId: 'user.createdDate',
            format: item => pipe.momentDate.transform(item.createdDate)
        });
    }
}

export enum PaymentTableSettingsType {
    ALL = 'ALL',
    COMPANY = 'COMPANY',
    PROJECT = 'PROJECT',
}
