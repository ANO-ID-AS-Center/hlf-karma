import { Component, ElementRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { Transport } from '@ts-core/common/transport';
import { PipeService } from '@core/service';
import * as _ from 'lodash';

@Component({
    templateUrl: 'login-page.component.html',
})
export class LoginPageComponent extends DestroyableContainer {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------


    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(
        element: ElementRef,
        pipe: PipeService,
        private transport: Transport
    ) {
        super();
        ViewUtil.addClasses(element, 'd-flex justify-content-center align-items-center scroll-vertical w-100 h-100');
    }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------




}
