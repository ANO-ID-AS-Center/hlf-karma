import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterService } from '@core/service';
import { ShellPageComponent } from './shell-page.component';

const routes: Routes = [
    {
        path: '',
        component: ShellPageComponent,
        children: [
            {
                path: '',
                redirectTo: RouterService.USERS_URL
            },
            {
                path: RouterService.USERS_URL,
                loadChildren: async () => (await import('@page/users/users-page.module')).UsersPageModule
            },
            { path: '**', redirectTo: RouterService.USERS_URL }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellPageRoutingModule { }
