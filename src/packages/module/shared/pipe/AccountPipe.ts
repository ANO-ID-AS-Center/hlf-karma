import { Pipe, PipeTransform } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import * as _ from 'lodash';
import { LanguageService } from '@ts-core/frontend/language';
import { PrettifyPipe } from '@ts-core/angular';
import { PaymentAmountPipe } from '@feature/payment/pipe';
import { Accounts } from '@project/common/platform/account';

@Pipe({
    name: 'account'
})
export class AccountPipe extends DestroyableContainer implements PipeTransform {
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

    public transform(item: Accounts): string {
        if (_.isNil(item)) {
            return PrettifyPipe.EMPTY_SYMBOL;
        }
        let items = [];
        for (let currency in item) {
            items.push(`${PaymentAmountPipe.fromCent(item[currency])} ${currency}`);
        }
        return items.join(',');
    }

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this.language = null;
    }
}
