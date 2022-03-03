import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TransportLazyModule } from '@ts-core/angular';
import { CompanyAddHandler } from './service';
import { Transport } from '@ts-core/common/transport';
import { CompanyAddCommand } from './transport';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CompanyAddComponent } from './component/company-add/company-add.component';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [];
const declarations = [CompanyAddComponent];

@NgModule({
    imports: [
        CommonModule, 
        FormsModule, 
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatExpansionModule,
        MatMenuModule,
        MatProgressBarModule,
        MatDatepickerModule,
        SharedModule],
    exports: declarations,
    declarations,
    providers
})
export class CompanyModule extends TransportLazyModule<CompanyModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'CompanyModule';
    public static COMMANDS = [CompanyAddCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<CompanyModule>, transport: Transport, add: CompanyAddHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return CompanyModule.ID;
    }

    public get commands(): Array<string> {
        return CompanyModule.COMMANDS;
    }
}
