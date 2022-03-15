import { Component, ViewContainerRef } from '@angular/core';
import { ViewUtil, WindowService } from '@ts-core/angular';
import { PipeService } from '@core/service';
import * as _ from 'lodash';
import { ISerializable } from '@ts-core/common';
import { } from '@common/platform/company';
import { Transport } from '@ts-core/common/transport';
import {
    CompanyPreferences
} from '@project/common/platform/company';
import { Client } from '@project/common/platform/api';
import { ObjectUtil } from '@ts-core/common/util';
import { CompanyBaseComponent } from '../CompanyBaseComponent';

@Component({
    selector: 'company-add',
    templateUrl: 'company-add.component.html'
})
export class CompanyAddComponent extends CompanyBaseComponent implements ISerializable<Partial<CompanyPreferences>> {
    //--------------------------------------------------------------------------
    //
    //  Constants
    //
    //--------------------------------------------------------------------------

    public static EVENT_SUBMITTED = 'EVENT_SUBMITTED';

    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public isNalogLoaded: boolean;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private transport: Transport,
        private pipe: PipeService,
        private api: Client,
        private windows: WindowService,
    ) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this._preferences = new CompanyPreferences();
        this.preferences.inn = '7751161170';
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async load(): Promise<void> {
        if (this.isDisabled) {
            return;
        }

        this.isDisabled = true;
        this.isNalogLoaded = false;

        let nalog = null;
        try {
            let [item] = await this.api.nalogSearch(this.preferences.inn);
            nalog = item;
            if (_.isEmpty(item)) {
                this.windows.info(`company.add.noNalogObject`);
                return;
            }
            ObjectUtil.copyProperties(item, this.preferences);
            this.preferences.title = this.preferences.nameShort;
            this.preferences.addressPost = this.preferences.address;
        }
        finally {
            this.isDisabled = false;
            this.isNalogLoaded = !_.isNil(nalog);
        }
    }

    public async submit(): Promise<void> {
        await this.windows.question('general.save.confirmation').yesNotPromise;
        this.emit(CompanyAddComponent.EVENT_SUBMITTED);
    }

    public async geoSelect(): Promise<void> {
        /*
        let item = await this.transport.sendListen(new GeoSelectCommand(this.user.preferences.toGeo()), { timeout: DateUtil.MILISECONDS_DAY });
        this.location = item.location;
        this.latitude = item.latitude;
        this.longitude = item.longitude;
        */
    }

    public serialize(): Partial<CompanyPreferences> {
        return this.preferences;
    }

}
