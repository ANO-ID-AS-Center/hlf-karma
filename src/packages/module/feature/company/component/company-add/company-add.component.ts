import { Component, ViewContainerRef } from '@angular/core';
import { SelectListItem, SelectListItems, ViewUtil, WindowService } from '@ts-core/angular';
import * as _ from 'lodash';
import { ISerializable } from '@ts-core/common';
import { } from '@common/platform/company';
import { Company, CompanyPreferences } from '@project/common/platform/company';
import { Client } from '@project/common/platform/api';
import { ObjectUtil } from '@ts-core/common/util';
import { CompanyBaseComponent } from '../CompanyBaseComponent';
import { ICompanyAddDto } from '@project/common/platform/api/company';
import { PaymentAggregator, PaymentAggregatorType } from '@project/common/platform/payment/aggregator';
import { PipeService } from '@core/service';
import { UserCompany } from '@project/common/platform/user';

@Component({
    selector: 'company-add',
    templateUrl: 'company-add.component.html'
})
export class CompanyAddComponent extends CompanyBaseComponent implements ISerializable<ICompanyAddDto> {
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
    public paymentAggregatorTypes: SelectListItems<SelectListItem<PaymentAggregatorType>>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private pipe: PipeService,
        private api: Client,
        private windows: WindowService,
    ) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.paymentAggregatorTypes = this.addDestroyable(new SelectListItems(this.pipe.language));
        Object.values(PaymentAggregatorType).forEach((item, index) => this.paymentAggregatorTypes.add(new SelectListItem(`payment.aggregator.type.${item}`, index, item)));
        this.paymentAggregatorTypes.complete();

        this.company = new UserCompany();
        this.company.preferences = new CompanyPreferences();
        this.company.preferences.inn = '7751161170';

        this.company.paymentAggregator = new PaymentAggregator();
        this.company.paymentAggregator.type = PaymentAggregatorType.CLOUD_PAYMENTS;
        this.company.paymentAggregator.uid = 'pk_7cf84ef18b04bbe7611e317958dc0';
        this.company.paymentAggregator.key = '484fad603e581acc459923ac9476e4b9';
    }

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
            let [item] = await this.api.nalogSearch(this.company.preferences.inn);
            nalog = item;
            if (_.isEmpty(item)) {
                this.windows.info(`company.add.noNalogObject`);
                return;
            }
            ObjectUtil.copyProperties(item, this.company.preferences);
            this.company.preferences.title = this.company.preferences.nameShort;
            this.company.preferences.addressPost = this.company.preferences.address;
        }
        finally {
            this.isDisabled = false;
            this.isNalogLoaded = !_.isNil(nalog);
        }
    }

    public async submit(): Promise<void> {
        await this.windows.question('company.action.save.confirmation').yesNotPromise;
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

    public serialize(): ICompanyAddDto {
        return {
            preferences: this.company.preferences,
            paymentAggregator: this.company.paymentAggregator
        }
    }
}
