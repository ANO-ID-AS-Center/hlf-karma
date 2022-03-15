import { Injectable } from '@angular/core';
import { Client } from '@project/common/platform/api';
import { WindowConfig, WindowEvent, WindowService } from '@ts-core/angular';
import { Logger } from '@ts-core/common/logger';
import { PromiseHandler } from '@ts-core/common/promise';
import { Transport, TransportCommandAsyncHandler } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs';
import { CompanyService } from '@core/service';
import { CompanyAddComponent } from '../component/company-add/company-add.component';
import { CompanyAddCommand, ICompanyAddDtoResponse } from '../transport';

@Injectable({ providedIn: 'root' })
export class CompanyAddHandler extends TransportCommandAsyncHandler<void, ICompanyAddDtoResponse, CompanyAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private company: CompanyService, private windows: WindowService, private api: Client) {
        super(logger, transport, CompanyAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<ICompanyAddDtoResponse> {
        let windowId = 'companyAdd';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 600);
        config.id = windowId;

        let promise = PromiseHandler.create<ICompanyAddDtoResponse>();
        let content = this.windows.open(CompanyAddComponent, config) as CompanyAddComponent;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case CompanyAddComponent.EVENT_SUBMITTED:
                    let item = this.company.company = await this.api.companyAdd({ preferences: content.serialize() });
                    promise.resolve(item);
                    content.close();
                    break;
                case WindowEvent.CLOSED:
                    promise.reject();
                    break;
            }
        });
        return promise.promise;

    }
}
