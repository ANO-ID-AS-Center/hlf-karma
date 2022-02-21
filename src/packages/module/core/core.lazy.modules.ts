//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { UserModule } from '@feature/user';
import { LoginModule } from '@feature/login';
import { ProfileModule } from '@feature/profile';

export const TRANSPORT_LAZY_MODULES = [
    {
        id: LoginModule.ID,
        commands: LoginModule.COMMANDS,
        path: async () => (await import('@feature/login')).LoginModule
    },
    {
        id: UserModule.ID,
        commands: LoginModule.COMMANDS,
        path: async () => (await import('@feature/user')).UserModule
    },
    {
        id: ProfileModule.ID,
        commands: ProfileModule.COMMANDS,
        path: async () => (await import('@feature/profile')).ProfileModule
    }
];
