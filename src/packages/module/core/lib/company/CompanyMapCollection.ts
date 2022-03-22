import { Company, CompanyPreferences } from '@common/platform/company';
import { CdkTablePaginableMapCollection, ICdkTableColumn, ICdkTableSettings } from '@ts-core/angular';
import { IPagination } from '@ts-core/common/dto';
import * as _ from 'lodash';
import { Client } from '@common/platform/api';
import { PipeService, CompanyService, UserService } from '@core/service';
import { Injectable } from '@angular/core';
import { TransformUtil } from '@ts-core/common/util';
import { UserCompany } from '@project/common/platform/user';
import { CompanyStatus } from '@project/common/platform/company';

@Injectable()
export class CompanyMapCollection extends CdkTablePaginableMapCollection<Company, Company> {

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

    protected request(): Promise<IPagination<Company>> {
        return this.api.companyList(this.createRequestData() as any);
    }

    protected parseItem(item: Company): Company {
        return TransformUtil.toClass(Company, item);
    }
}

export class CompanyTableSettings implements ICdkTableSettings<UserCompany> {
    // --------------------------------------------------------------------------
    //
    // 	Properties
    //
    // --------------------------------------------------------------------------

    public columns: Array<ICdkTableColumn<UserCompany>>;
    public static COLUMN_NAME_MENU = 'menu';

    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(pipe: PipeService, user: UserService) {
        this.columns = [];
        
        this.columns.push({
            name: CompanyTableSettings.COLUMN_NAME_MENU,
            headerId: '',
            headerClassName: 'pl-3',
            className: 'pl-3 fas fa-ellipsis-v',
            isDisableSort: true,
        });
        this.columns.push({
            name: 'title',
            headerId: 'company.preferences.title',
            isDisableSort: true,
            format: item => item.preferences.title
        })
        this.columns.push({
            name: 'status',
            headerId: 'company.status.status',
            isDisableSort: true,
            className: item => {
                switch (item.status) {
                    case CompanyStatus.VERIFICATION_PROCESS:
                        return 'text-warning';
                    case CompanyStatus.REJECTED:
                    case CompanyStatus.NON_ACTIVE:
                        return 'text-danger';
                }
                return null;
            },
            format: item => pipe.language.translate(`company.status.${item.status}`)
        })

        this.columns.push({
            name: 'name',
            headerId: 'company.preferences.ceo',
            headerClassName: 'pl-3',
            isDisableSort: true,
            format: item => item.preferences.ceo
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
