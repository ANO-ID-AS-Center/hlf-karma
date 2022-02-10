import { Component, ElementRef } from '@angular/core';
import { ViewUtil } from '@ts-core/angular';
import { DestroyableContainer } from '@ts-core/common';
import * as _ from 'lodash';
import { LedgerService } from '@core/service';
import { LedgerBlockEventMapCollection } from '@core/lib';

@Component({
    templateUrl: './events-page.component.html'
})
export class EventsPageComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(element: ElementRef, public service: LedgerService) {
        super();
        ViewUtil.addClasses(element, 'd-block');

        if (!this.items.isDirty) {
            this.items.reload();
        }
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get items(): LedgerBlockEventMapCollection {
        return this.service.events;
    }
}
