import { Injectable } from '@angular/core';
import { Client } from '@project/common/platform/api';
import { IUserEditDtoResponse } from '@project/common/platform/api/user';
import { UserUid, WindowConfig, WindowEvent, WindowService } from '@ts-core/angular';
import { Logger } from '@ts-core/common/logger';
import { PromiseHandler } from '@ts-core/common/promise';
import { Transport, TransportCommandAsyncHandler } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs';
import { UserEditComponent } from '../component';
import { UserEditCommand, UserSaveCommand } from '../transport';

@Injectable({ providedIn: 'root' })
export class UserEditHandler extends TransportCommandAsyncHandler<UserUid, IUserEditDtoResponse, UserEditCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private windows: WindowService, private api: Client) {
        super(logger, transport, UserEditCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: UserUid): Promise<IUserEditDtoResponse> {
        let windowId = 'userEdit' + params;
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let item = await this.api.userGet(params);

        let config = new WindowConfig(true, false, 360);
        config.id = windowId;

        let promise = PromiseHandler.create<IUserEditDtoResponse>();
        let content = this.windows.open(UserEditComponent, config) as UserEditComponent;
        content.user = item;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case UserEditComponent.EVENT_SUBMITTED:
                    item = await this.transport.sendListen(new UserSaveCommand(content.serialize()));
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
