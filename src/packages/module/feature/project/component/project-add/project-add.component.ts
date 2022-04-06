import { Component, ViewContainerRef } from '@angular/core';
import { ISelectListItem, SelectListItem, SelectListItems, ViewUtil, WindowService } from '@ts-core/angular';
import { PipeService } from '@core/service';
import * as _ from 'lodash';
import { ISerializable } from '@ts-core/common';
import { } from '@common/platform/project';
import { Transport } from '@ts-core/common/transport';
import { Project, ProjectPreferences } from '@project/common/platform/project';
import { Client } from '@project/common/platform/api';
import { ProjectBaseComponent } from '../ProjectBaseComponent';
import { IProjectAddDto } from '@project/common/platform/api/project';
import { LedgerCoinId } from '@project/common/ledger/coin';
import { Accounts } from '@project/common/platform/account';
import { ObjectUtil } from '@ts-core/common/util';

@Component({
    selector: 'project-add',
    templateUrl: 'project-add.component.html'
})
export class ProjectAddComponent extends ProjectBaseComponent implements ISerializable<IProjectAddDto> {
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

    public amount: string;
    public currencies: SelectListItems<ISelectListItem<LedgerCoinId>>;

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

        this.currencies = new SelectListItems(pipe.language);
        Object.values(LedgerCoinId).forEach((item, index) => this.currencies.add(new SelectListItem(item, index, item)));
        this.currencies.complete(0);

        this.project = new Project();
        this.project.preferences = new ProjectPreferences();
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        await this.windows.question('project.action.save.confirmation').yesNotPromise;
        this.emit(ProjectAddComponent.EVENT_SUBMITTED);
    }

    public async geoSelect(): Promise<void> {
        /*
        let item = await this.transport.sendListen(new GeoSelectCommand(this.user.preferences.toGeo()), { timeout: DateUtil.MILISECONDS_DAY });
        this.location = item.location;
        this.latitude = item.latitude;
        this.longitude = item.longitude;
        */
    }

    public serialize(): IProjectAddDto {
        return {
            required: { [this.currencies.selectedData]: this.amount.toString() } as Accounts,
            preferences: this.project.preferences
        }
    }

}
