import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterService } from '@core/service';
import { CompanyGuard, CompaniesGuard } from '@feature/company/guard';
import { UsersGuard } from '@feature/user/guard';
import { ProjectsGuard } from '@feature/project/guard';
import { ShellPageComponent } from './shell-page.component';

const routes: Routes = [
    {
        path: '',
        component: ShellPageComponent,
        children: [
            {
                path: '',
                redirectTo: RouterService.USER_URL
            },
            {
                path: RouterService.USER_URL,
                loadChildren: async () => (await import('../user/user-page.module')).UserPageModule
            },
            {
                path: RouterService.USERS_URL,
                canActivate: [UsersGuard],
                loadChildren: async () => (await import('@page/users/users-page.module')).UsersPageModule
            },
            {
                path: RouterService.COMPANY_URL,
                canActivate: [CompanyGuard],
                loadChildren: async () => (await import('../company/company-page.module')).CompanyPageModule
            },
            {
                path: RouterService.COMPANIES_URL,
                canActivate: [CompaniesGuard],
                loadChildren: async () => (await import('@page/companies/companies-page.module')).CompaniesPageModule
            },
            {
                path: RouterService.PROJECTS_URL,
                canActivate: [ProjectsGuard],
                loadChildren: async () => (await import('@page/projects/projects-page.module')).ProjectsPageModule
            },
            { path: '**', redirectTo: '/' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShellPageRoutingModule { }
