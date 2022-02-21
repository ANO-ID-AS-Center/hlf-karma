import { User } from '@common/platform/user';
import { CdkTablePaginableMapCollection, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular';
import { IPagination } from '@ts-core/common/dto';
import * as _ from 'lodash';
import { Client } from '@common/platform/api';
import { UserType } from '@common/platform/user';
import { PipeService, UserService } from '../../service';
import { Injectable } from '@angular/core';
import { TransformUtil } from '@ts-core/common/util';

@Injectable()
export class UserMapCollection extends CdkTablePaginableMapCollection<User, User> {

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client) {
        super(`uid`);
        this.sort.createdDate = false;
    }

    // --------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    // --------------------------------------------------------------------------

    protected isNeedClearAfterLoad(): boolean {
        return true;
    }

    protected request(): Promise<IPagination<User>> {
        return this.api.userList(this.createRequestData() as any);
    }

    protected parseItem(item: User): User {
        return TransformUtil.toClass(User, item);
    }
}

export class UserTableSettings implements ICdkTableSettings<User> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<User>>;
    public static COLUMN_NAME_MENU = 'menu';

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService, user: UserService) {

        this.columns = [];
        this.columns.push({
            name: 'login',
            headerId: 'user.login',
            headerClassName: 'pl-3',
            className: 'pl-3',
            format: item => !_.isNil(item.preferences) && !_.isEmpty(item.preferences.name) ? item.preferences.name : item.login,
            isMultiline: false,
        })
        /*

        {
            name: 'description',
            headerId: 'user.description',
            isMultiline: true
        },
        {
            name: 'createdDate',
            headerId: 'user.createdDate',
            format: item => pipe.momentDate.transform(item.createdDate)
        },
        {
            name: 'role',
            headerId: 'role.roles',
            isMultiline: true,
        },
        */

        this.columns.push(
            {
                name: UserTableSettings.COLUMN_NAME_MENU,
                headerId: '',
                isDisableSort: true,
                className: 'fas fa-ellipsis-v'
            });

    }


}
