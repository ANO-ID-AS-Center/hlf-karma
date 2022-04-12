import { Component, ViewContainerRef } from '@angular/core';
import { ISelectListItem, IWindowContent, SelectListItem, SelectListItems, ViewUtil } from '@ts-core/angular';
import { PipeService } from '@core/service';
import * as _ from 'lodash';
import { ISerializable } from '@ts-core/common';
import { } from '@common/platform/project';
import { LedgerCoinId } from '@project/common/ledger/coin';
import { ProjectPurpose, PROJECT_PURPOSE_MIN_LENGTH, PROJECT_PURPOSE_MAX_LENGTH } from '@project/common/platform/project';
import { RandomUtil, TransformUtil } from '@ts-core/common/util';
import { AmountPipe } from '@shared/pipe';

@Component({
    selector: 'project-purpose-add',
    templateUrl: 'project-purpose-add.component.html'
})
export class ProjectPurposeAddComponent extends IWindowContent implements ISerializable<ProjectPurpose> {
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

    public name: string;
    public amount: string;
    public currencies: SelectListItems<ISelectListItem<LedgerCoinId>>;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private pipe: PipeService,
    ) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.currencies = new SelectListItems(pipe.language);
        Object.values(LedgerCoinId).forEach((item, index) => this.currencies.add(new SelectListItem(item, index, item)));
        this.currencies.complete(0);

    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public get nameMinLength(): number {
        return PROJECT_PURPOSE_MIN_LENGTH;
    }
    public get nameMaxLength(): number {
        return PROJECT_PURPOSE_MAX_LENGTH;
    }

    public async submit(): Promise<void> {
        this.emit(ProjectPurposeAddComponent.EVENT_SUBMITTED);
    }

    public serialize(): ProjectPurpose {
        return TransformUtil.toClass(ProjectPurpose, {
            id: new Date().getTime(),
            name: this.name,
            amount: AmountPipe.toCent(this.amount),
            currency: this.currencies.selectedData,
        })
    }

}
