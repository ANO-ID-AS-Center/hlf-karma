import { Component, ViewContainerRef } from '@angular/core';
import { IWindowContent, ViewUtil, WindowService } from '@ts-core/angular';
import { UserService, PipeService } from '@core/service';
import * as _ from 'lodash';
import { ISerializable } from '@ts-core/common';
import { } from '@common/platform/company';
import { Transport } from '@ts-core/common/transport';
import {
    COMPANY_PREFERENCES_TITLE_MIN_LENGTH,
    COMPANY_PREFERENCES_EMAIL_MAX_LENGTH,
    COMPANY_PREFERENCES_INN_MIN_LENGTH,
    COMPANY_PREFERENCES_INN_MAX_LENGTH,
    COMPANY_PREFERENCES_TITLE_MAX_LENGTH,
    COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH,
    COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH,
    COMPANY_PREFERENCES_PHONE_MAX_LENGTH,
    CompanyPreferences
} from '@project/common/platform/company';
import { Client } from '@project/common/platform/api';
import { INalogObject } from '@project/common/platform/api/nalog';

@Component({
    selector: 'company-add',
    templateUrl: 'company-add.component.html'
})
export class CompanyAddComponent extends IWindowContent implements ISerializable<Partial<CompanyPreferences>> {
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

    public inn: string;
    public object: INalogObject;

    public title: string;
    public phone: string;
    public email: string;
    public website: string;
    public picture: string;
    public addressPost: string;

    public location: string;
    public latitude: number;
    public longitude: number;

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

        this.inn = '7751161170';
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
        try {
            let items = await this.api.nalogSearch(this.inn);
            if (_.isEmpty(items)) {
                this.windows.info(`company.add.noNalogObject`);
                return;
            }
            if (items.length > 1) {
                this.windows.info(`company.add.manyNalogObject`);
                return;
            }
            let item = this.object = items[0];
            this.title = item.nameShort;
            this.addressPost = item.address;
        }
        finally {
            this.isDisabled = false;
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
        let preferences = {} as Partial<CompanyPreferences>;
        preferences.title = this.title;
        preferences.phone = this.phone;
        preferences.email = this.email;
        preferences.location = this.location;
        preferences.latitude = this.latitude;
        preferences.longitude = this.longitude;
        return preferences;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get phoneMaxLength(): number {
        return COMPANY_PREFERENCES_PHONE_MAX_LENGTH;
    }
    public get websiteMaxLength(): number {
        return COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH;
    }
    public get addressMaxLength(): number {
        return COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH;
    }
    public get emailMaxLength(): number {
        return COMPANY_PREFERENCES_EMAIL_MAX_LENGTH;
    }
    public get innMinLength(): number {
        return COMPANY_PREFERENCES_INN_MIN_LENGTH;
    }
    public get innMaxLength(): number {
        return COMPANY_PREFERENCES_INN_MAX_LENGTH;
    }
    public get titleMinLength(): number {
        return COMPANY_PREFERENCES_TITLE_MIN_LENGTH;
    }
    public get titleMaxLength(): number {
        return COMPANY_PREFERENCES_TITLE_MAX_LENGTH;
    }
}
