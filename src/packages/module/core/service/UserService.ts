import { Injectable } from '@angular/core';
import { UserBaseService } from '@ts-core/angular';
import { LoginService } from './LoginService';
import { IInitDtoResponse } from '@common/platform/api/login';
import { User } from '../lib/user';
import { TransformUtil } from '@ts-core/common/util';
import { UserPreferences } from '@common/platform/user';
import * as _ from 'lodash';
import { ExtendedError } from '@ts-core/common/error';
import { Transport } from '@ts-core/common/transport';
import { UserSaveCommand } from '@feature/user/transport';

@Injectable({ providedIn: 'root' })
export class UserService extends UserBaseService<User, UserServiceEvent> {
    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(login: LoginService, private transport: Transport) {
        super(login);
        this.initialize();
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    protected createUser(data: IInitDtoResponse): User {
        let item = TransformUtil.toClass(User, data.user);
        return item;
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public async save(item: Partial<UserPreferences>): Promise<boolean> {
        if (_.isNil(this.preferences)) {
            throw new ExtendedError('Unable to save user preferences: user is not logined');
        }

        for (let key of Object.keys(item)) {
            if (item[key] === this.preferences[key]) {
                delete item[key];
            }
        }

        if (_.isEmpty(item)) {
            return false;
        }
        await this.transport.sendListen(new UserSaveCommand({ uid: this.user.id.toString(), preferences: item }));
        return true;
    }

    public get preferences(): UserPreferences {
        return this.isLogined ? this.user.preferences : null;
    }
}

export enum UserServiceEvent { }
