import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import * as _ from 'lodash';
import { UserService } from '@core/service';

@Injectable({ providedIn: 'root' })
export class ProjectsGuard implements CanActivate {
    // --------------------------------------------------------------------------
    //
    // 	Constructor
    //
    // --------------------------------------------------------------------------

    constructor(private user: UserService, private router: Router) { }

    // --------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    // --------------------------------------------------------------------------

    public canActivate(): boolean | UrlTree {
        return this.user.isAdministrator || this.user.isEditor || this.user.isCompanyManager || this.user.isCompanyWorker ? true : this.router.parseUrl('/');
    }

}
