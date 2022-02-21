import { CommonModule } from '@angular/common';
import { NgModule, NgModuleRef } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TransportLazyModule } from '@ts-core/angular';
import { UserSaveHandler } from './service';
import { Transport } from '@ts-core/common/transport';
import { UserSaveCommand } from './transport';

//--------------------------------------------------------------------------
//
// 	Constants
//
//--------------------------------------------------------------------------

const providers = [UserSaveHandler];
const declarations = [];

@NgModule({
    imports: [CommonModule, SharedModule],
    exports: declarations,
    declarations,
    providers
})
export class UserModule extends TransportLazyModule<UserModule> {
    //--------------------------------------------------------------------------
    //
    // 	Public Static Properties
    //
    //--------------------------------------------------------------------------

    public static ID = 'UserModule';
    public static COMMANDS = [UserSaveCommand.NAME];

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(reference: NgModuleRef<UserModule>, transport: Transport, save: UserSaveHandler) {
        super(reference, transport);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get id(): string {
        return UserModule.ID;
    }

    public get commands(): Array<string> {
        return UserModule.COMMANDS;
    }
}
