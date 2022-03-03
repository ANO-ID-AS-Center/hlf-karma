
import { PipeService } from "@core/service";
import { IPaymentOpenDtoResponse, PaymentOpenResult } from "../../transport";
import { PaymentAggregatorManager } from "../PaymentAggregatorManager";
import { APP_INITIALIZER } from "@angular/core";
import { APPLICATION_INJECTOR } from "@ts-core/angular";
import { IPaymentAggregatorGetDtoResponse } from "@project/common/platform/api/payment";
import * as _ from 'lodash';
import { PromiseHandler } from "@ts-core/common/promise";
import { LoadableStatus } from "@ts-core/common";
import { ExtendedError } from "@ts-core/common/error";
import { ICloudPayments } from "@project/common/platform/api/payment/aggregator/cloudpayments";

export class CloudPaymentsAggregator extends PaymentAggregatorManager {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super('//widget.cloudpayments.ru/bundles/cloudpayments.js');
    }

    // --------------------------------------------------------------------------
    //
    //  Public Methods
    //
    // --------------------------------------------------------------------------

    public async open(item: IPaymentAggregatorGetDtoResponse): Promise<IPaymentOpenDtoResponse> {
        await this.script.load();

        let options = {
            amount: item.amount,
            publicId: item.uid,
            currency: item.currency,
            accountId: item.details,
            description: this.pipe.language.translate('payment.aggregator.description', { name: item.target.name })
        } as any;


        if (!_.isNil(this.user.preferences)) {
            options.email = this.user.preferences.email;
            // skin: 'mini'
            // description: 'Оплата товаров в example.com',
            // data: {myProp: 'myProp value'}
        }

        var widget = new window['cp'].CloudPayments();
        widget.pay('auth', options,
            {
                onFail: (reason, options) => promise.reject(new ExtendedError(reason)),
                onSuccess: (options) => promise.resolve({}),
                onComplete: (result, options) => {
                    if (result.success) {
                        promise.resolve({});
                    }
                    else {
                        promise.reject(new ExtendedError(`Unable to make payment code "${result.code}"`))
                    }
                }
            });

        let promise = PromiseHandler.create<IPaymentOpenDtoResponse, ExtendedError>();
        return promise.promise;
    }
}