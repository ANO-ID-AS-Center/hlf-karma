import { CommonModule } from '@angular/common';
import { Injector, NgModule, NgModuleRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';
import { ProfileInfoComponent } from './component/profile-info/profile-info.component';
import { ProfileEditComponent } from './component/profile-edit/profile-edit.component';
import { ProfileEditHandler, ProfileMenu } from './service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TransportLazyModule } from '@ts-core/angular';
import { Transport } from '@ts-core/common/transport';
import { ProfileEditCommand } from './transport/command';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [ProfileMenu];
const declarations = [ProfileInfoComponent, ProfileEditComponent];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatProgressBarModule,
        MatDatepickerModule,
        SharedModule
    ],
    exports: declarations,
    declarations,
    providers
})
export class ProfileModule extends TransportLazyModule<ProfileModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'ProfileModule';
    public static COMMANDS = [ProfileEditCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<ProfileModule>, transport: Transport, open: ProfileEditHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return ProfileModule.ID;
    }

    public get commands(): Array<string> {
        return ProfileModule.COMMANDS;
    }
}
