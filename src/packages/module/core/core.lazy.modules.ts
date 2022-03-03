//--------------------------------------------------------------------------
//
// 	Imports
//
//--------------------------------------------------------------------------

import { UserModule } from '@feature/user';
import { LoginModule } from '@feature/login';
import { CompanyModule } from '@feature/company';
import { ProfileModule } from '@feature/profile';
import { ProfileQuizModule } from '@feature/profile-quiz';
import { PaymentModule } from '@feature/payment';

export const TRANSPORT_LAZY_MODULES = [
    {
        id: LoginModule.ID,
        commands: LoginModule.COMMANDS,
        path: async () => (await import('@feature/login')).LoginModule
    },
    {
        id: UserModule.ID,
        commands: UserModule.COMMANDS,
        path: async () => (await import('@feature/user')).UserModule
    },
    {
        id: CompanyModule.ID,
        commands: CompanyModule.COMMANDS,
        path: async () => (await import('@feature/company')).CompanyModule
    },
    {
        id: PaymentModule.ID,
        commands: PaymentModule.COMMANDS,
        path: async () => (await import('@feature/payment')).PaymentModule
    },
    {
        id: ProfileModule.ID,
        commands: ProfileModule.COMMANDS,
        path: async () => (await import('@feature/profile')).ProfileModule
    },
    {
        id: ProfileQuizModule.ID,
        commands: ProfileQuizModule.COMMANDS,
        path: async () => (await import('@feature/profile-quiz')).ProfileQuizModule
    }
];
