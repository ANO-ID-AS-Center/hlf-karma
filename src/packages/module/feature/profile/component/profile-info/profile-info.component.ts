import { Component, ViewContainerRef } from '@angular/core';
import { DestroyableContainer } from '@ts-core/common';
import { ViewUtil } from '@ts-core/angular';
import { takeUntil } from 'rxjs/operators';
import { User } from '@core/lib/user';
import { ThemeAssetService } from '@ts-core/frontend/theme';
import { UserService, PipeService, LoginService } from '@core/service';
import { ProfileMenu } from '../../service';
import { merge } from 'rxjs';
import * as _ from 'lodash';

@Component({
    selector: 'profile-info',
    templateUrl: 'profile-info.component.html',
    styleUrls: ['profile-info.component.scss']
})
export class ProfileInfoComponent extends DestroyableContainer {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    public name: string;
    public picture: string;
    public description: string;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        public menu: ProfileMenu,
        private pipe: PipeService,
        private service: UserService,
        private themeAsset: ThemeAssetService
    ) {
        super();
        ViewUtil.addClasses(container.element, 'd-block mouse-active');

        this.commitUserProperties();
        merge(service.logined, service.logouted, service.changed, pipe.language.completed)
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.commitUserProperties());
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitUserProperties(): void {
        let value = null;

        value = this.getName();
        if (value !== this.name) {
            this.name = value;
        }

        value = this.getDescription();
        if (value !== this.description) {
            this.description = value;
        }

        value = this.getPicture();
        if (value !== this.picture) {
            this.picture = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public getName(): string {
        if (!_.isEmpty(this.profile.preferences.name)) {
            return this.profile.preferences.name;
        }
        return this.profile.login;
    }

    public getDescription(): string {
        return this.pipe.language.translate(`user.type.${this.profile.type}`);
    }

    public getPicture(): string {
        if (_.isNil(this.profile)) {
            return this.themeAsset.getIcon('moon64');
        }
        return this.profile.preferences.picture;
    }

    public get profile(): User {
        return this.service.user;
    }
}
