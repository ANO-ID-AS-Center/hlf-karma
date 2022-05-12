import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common/logger';
import { Transport, TransportCommandHandler } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { RouterService } from '@core/service';
import { ProjectAddCommand } from '../transport';

@Injectable({ providedIn: 'root' })
export class ProjectAddHandler extends TransportCommandHandler<void, ProjectAddCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private router: RouterService) {
        super(logger, transport, ProjectAddCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(): Promise<void> {
        this.router.navigate(RouterService.PROJECT_ADD_URL);
        /*
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
        */
    }
}
