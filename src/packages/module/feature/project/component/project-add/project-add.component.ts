import { Component, ViewContainerRef } from '@angular/core';
import { SelectListItem, SelectListItems, ViewUtil, WindowService } from '@ts-core/angular';
import { PipeService } from '@core/service';
import * as _ from 'lodash';
import { ISerializable } from '@ts-core/common';
import { } from '@common/platform/project';
import { Transport } from '@ts-core/common/transport';
import { Project, ProjectPreferences, ProjectTag } from '@project/common/platform/project';
import { Client } from '@project/common/platform/api';
import { ProjectBaseComponent } from '../ProjectBaseComponent';
import { IProjectAddDto } from '@project/common/platform/api/project';
import { UserProject } from '@project/common/platform/user';

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

    public tagsAll: SelectListItems<SelectListItem<ProjectTag>>;

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

        this.tagsAll = this.addDestroyable(new SelectListItems(pipe.language));
        Object.values(ProjectTag).forEach((item, index) => this.tagsAll.add(new SelectListItem(`project.tag.${item}`, index, item)));
        this.tagsAll.complete();

        this.project = new UserProject();
        this.project.purposes = [];
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
            purposes: this.project.purposes,
            preferences: this.project.preferences
        }
    }

}
