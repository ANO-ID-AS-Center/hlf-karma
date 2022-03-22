import { Project } from '@common/platform/project';
import { CdkTablePaginableMapCollection, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular';
import { IPagination } from '@ts-core/common/dto';
import * as _ from 'lodash';
import { Client } from '@common/platform/api';
import { PipeService, UserService } from '@core/service';
import { Injectable } from '@angular/core';
import { TransformUtil } from '@ts-core/common/util';
import { UserProject } from '@project/common/platform/user';
import { ProjectStatus } from '@project/common/platform/project';

@Injectable()
export class ProjectMapCollection extends CdkTablePaginableMapCollection<Project, Project> {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private api: Client) {
        super(`id`);
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

    protected request(): Promise<IPagination<Project>> {
        return this.api.projectList(this.createRequestData() as any);
    }

    protected parseItem(item: Project): Project {
        return TransformUtil.toClass(Project, item);
    }
}

export class ProjectTableSettings implements ICdkTableSettings<UserProject> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<UserProject>>;
    public static COLUMN_NAME_MENU = 'menu';

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService, user: UserService) {
        this.columns = [];
        this.columns.push({
            name: ProjectTableSettings.COLUMN_NAME_MENU,
            headerId: '',
            headerClassName: 'pl-3',
            className: 'pl-3 fas fa-ellipsis-v',
            isDisableSort: true,
        });
        this.columns.push({
            name: 'title',
            headerId: 'project.preferences.title',
            isDisableSort: true,
            format: item => item.preferences.title
        })
        this.columns.push({
            name: 'status',
            headerId: 'project.status.status',
            isDisableSort: true,
            className: item => {
                switch(item.status) {
                    case ProjectStatus.VERIFICATION_PROCESS:
                        return 'text-warning';
                    case ProjectStatus.REJECTED:
                        case ProjectStatus.NON_ACTIVE:
                        return 'text-danger';
                }
                return null;
            },
            format: item => pipe.language.translate(`project.status.${item.status}`)
        })

        /*
        if (user.isAdministrator) {
            this.columns.push({
                name: 'type',
                headerId: 'user.type.type',
                format: item => pipe.language.translate(`user.type.${item.type}`)
            })
            this.columns.push({
                name: 'login',
                headerId: 'user.login',
                format: item => item.login,
            })
        }
        */
        this.columns.push({
            name: 'createdDate',
            headerId: 'user.createdDate',
            format: item => pipe.momentDate.transform(item.createdDate)
        });
    }


}
