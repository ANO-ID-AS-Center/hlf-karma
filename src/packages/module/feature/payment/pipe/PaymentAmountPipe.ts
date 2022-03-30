import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import * as _ from 'lodash';
import { LanguageService } from '@ts-core/frontend/language';
import { PrettifyPipe } from '@ts-core/angular';
import { Payment } from '@project/common/platform/payment';

@Pipe({
    name: 'paymentAmount'
})
export class PaymentAmountPipe extends DestroyableContainer implements PipeTransform {
    // --------------------------------------------------------------------------
    //
    //	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private language: LanguageService) {
        super();
    }

    // --------------------------------------------------------------------------
    //
    //	Public Methods
    //
    // --------------------------------------------------------------------------

    public transform(item: Payment): string {
        if (_.isNil(item)) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        return `${item.amount} ${item.currency}`;
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.language = null;
    }
}
