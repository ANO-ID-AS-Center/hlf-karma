import { Injectable } from '@angular/core';
import { WindowConfig, WindowEvent, WindowService } from '@ts-core/angular';
import { Logger } from '@ts-core/common/logger';
import { PromiseHandler } from '@ts-core/common/promise';
import { Transport, TransportCommandAsyncHandler } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { ProfileEditComponent } from '../component/profile-edit/profile-edit.component';
import { takeUntil } from 'rxjs/operators';
import { ProfileEditCommand, IProfileEditDto, IProfileEditDtoResponse } from '../transport/command';
import { Client } from '@common/platform/api';
import { UserService } from '@core/service';
import { UserSaveCommand } from '@feature/user/transport';

@Injectable({ providedIn: 'root' })
export class ProfileEditHandler extends TransportCommandAsyncHandler<IProfileEditDto, IProfileEditDtoResponse, ProfileEditCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private windows: WindowService, private user: UserService, private api: Client) {
        super(logger, transport, ProfileEditCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IProfileEditDto): Promise<IProfileEditDtoResponse> {
        if (_.isNil(params) || _.isEmpty(params)) {
            params = this.user.id;
        }

        let windowId = 'profileEdit' + params;
        if (this.windows.setOnTop(windowId)) {
            return Promise.reject('Already opened');
        }

        let item = await this.api.userGet(params);
        let config = new WindowConfig(true, false, 480);
        config.id = windowId;

        let promise = PromiseHandler.create<IProfileEditDtoResponse>();
        let content = this.windows.open(ProfileEditComponent, config) as ProfileEditComponent;
        content.profile = item;

        content.events.pipe(takeUntil(content.destroyed)).subscribe(async event => {
            switch (event) {
                case ProfileEditComponent.EVENT_SUBMITTED:
                    item = await this.transport.sendListen(new UserSaveCommand(content.serialize()));
                    if (item.id === this.user.id) {
                        this.user.userUpdate(item);
                    }
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
