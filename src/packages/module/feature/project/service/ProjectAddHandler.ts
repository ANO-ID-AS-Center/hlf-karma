import { Injectable } from '@angular/core';
import { Client } from '@project/common/platform/api';
import { NotificationService, WindowConfig, WindowEvent, WindowService } from '@ts-core/angular';
import { Logger } from '@ts-core/common/logger';
import { PromiseHandler } from '@ts-core/common/promise';
import { Transport, TransportCommandAsyncHandler } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs';
import { ProjectAddComponent } from '../component/project-add/project-add.component';
import { ProjectAddCommand, IProjectAddDtoResponse } from '../transport';

@Injectable({ providedIn: 'root' })
export class ProjectAddHandler extends TransportCommandAsyncHandler<void, IProjectAddDtoResponse, ProjectAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private notifications: NotificationService, private windows: WindowService, private api: Client) {
        super(logger, transport, ProjectAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<IProjectAddDtoResponse> {
        let windowId = 'projectAdd';
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let config = new WindowConfig(true, false, 600);
        config.id = windowId;

        let promise = PromiseHandler.create<IProjectAddDtoResponse>();
        let content = this.windows.open(ProjectAddComponent, config) as ProjectAddComponent;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case ProjectAddComponent.EVENT_SUBMITTED:
                    let item = await this.api.projectAdd(content.serialize());
                    this.notifications.info(`project.action.add.notification`);
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
