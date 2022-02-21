import { Component, Input, ViewContainerRef } from '@angular/core';
import { IWindowContent, SelectListItem, SelectListItems, ViewUtil, WindowService } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import { UserService } from '@core/service';
import * as _ from 'lodash';
import { User, UserPreferences } from '@common/platform/user';
import { ISerializable } from '@ts-core/common';
import { IUserEditDto } from '@common/platform/api/user';
import { USER_PREFERENCES_NAME_MIN_LENGTH, USER_PREFERENCES_DESCRIPTION_MAX_LENGTH, USER_PREFERENCES_NAME_MAX_LENGTH } from '@common/platform/user';
import moment, { Moment } from 'moment';
import { LoginResource } from '@common/platform/api/login';
import { UserPreferencesProjectCancelStrategy } from '@common/platform/user';
import { Transport } from '@ts-core/common/transport';

@Component({
    selector: 'profile-edit',
    templateUrl: 'profile-edit.component.html'
})
export class ProfileEditComponent extends IWindowContent implements ISerializable<IUserEditDto> {
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

    private _profile: User;

    public title: string;
    public isMales: SelectListItems<SelectListItem<boolean>>;
    public projectCancelStrategies: SelectListItems<SelectListItem<UserPreferencesProjectCancelStrategy>>;

    public name: string;
    public phone: string;
    public email: string;
    public locale: string;
    public isMale: boolean;
    public picture: string;
    public location: string;
    public latitude: number;
    public longitude: number;
    public resource: LoginResource;
    public birthday: Moment;
    public description: string;
    public projectCancelStrategy: UserPreferencesProjectCancelStrategy;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        container: ViewContainerRef,
        private transport: Transport,
        private language: LanguageService,
        private user: UserService,
        private windows: WindowService
    ) {
        super(container);
        ViewUtil.addClasses(container.element, 'd-flex flex-column');

        this.isMales = new SelectListItems(language);
        this.isMales.add(new SelectListItem('user.preferences.isMale.true', 0, true));
        this.isMales.add(new SelectListItem('user.preferences.isMale.false', 1, false));
        this.isMales.complete();

        this.projectCancelStrategies = new SelectListItems(language);
        Object.values(UserPreferencesProjectCancelStrategy).forEach((item, index) =>
            this.projectCancelStrategies.add(new SelectListItem(`user.projectCancelStrategy.${item}`, index, item))
        );
        this.projectCancelStrategies.complete();
    }

    //--------------------------------------------------------------------------
    //
    // 	Private Methods
    //
    //--------------------------------------------------------------------------

    private commitProfileProperties(): void {
        let value = null;

        value = this.getTitle();
        if (value !== this.title) {
            this.title = value;
        }

        value = this.profile.preferences.name;
        if (value !== this.name) {
            this.name = value;
        }

        value = this.profile.resource;
        if (value !== this.name) {
            this.resource = value;
        }

        value = this.profile.preferences.phone;
        if (value !== this.phone) {
            this.phone = value;
        }

        value = this.profile.preferences.email;
        if (value !== this.email) {
            this.email = value;
        }

        value = this.profile.preferences.locale;
        if (value !== this.locale) {
            this.locale = value;
        }

        value = this.profile.preferences.isMale;
        if (value !== this.isMale) {
            this.isMale = value;
        }

        value = this.profile.preferences.birthday;
        if (value !== this.birthday) {
            this.birthday = moment(value);
        }

        value = this.profile.preferences.picture;
        if (value !== this.picture) {
            this.picture = value;
        }

        value = this.profile.preferences.projectCancelStrategy;
        if (value !== this.projectCancelStrategy) {
            this.projectCancelStrategy = value;
        }

        value = this.profile.preferences.description;
        if (value !== this.description) {
            this.description = value;
        }

        value = this.profile.preferences.location;
        if (value !== this.location) {
            this.location = value;
        }

        value = this.profile.preferences.latitude;
        if (value !== this.latitude) {
            this.latitude = value;
        }

        value = this.profile.preferences.longitude;
        if (value !== this.longitude) {
            this.longitude = value;
        }
    }

    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------

    private getTitle(): string {
        if (this.user.id === this.profile.id) {
            return this.language.translate('user.preferences.preferences');
        }
        return this.profile.login;
    }

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public async submit(): Promise<void> {
        await this.windows.question('general.save.confirmation').yesNotPromise;
        this.emit(ProfileEditComponent.EVENT_SUBMITTED);
    }

    public async geoSelect(): Promise<void> {
        /*
        let item = await this.transport.sendListen(new GeoSelectCommand(this.profile.preferences.toGeo()), { timeout: DateUtil.MILISECONDS_DAY });
        this.location = item.location;
        this.latitude = item.latitude;
        this.longitude = item.longitude;
        */
    }

    public serialize(): IUserEditDto {
        let preferences = {} as Partial<UserPreferences>;
        preferences.name = this.name;
        preferences.isMale = this.isMale;
        preferences.location = this.location;
        preferences.latitude = this.latitude;
        preferences.longitude = this.longitude;
        preferences.description = this.description;
        if (!_.isNil(this.birthday)) {
            preferences.birthday = this.birthday.toDate();
        }

        return { uid: this.user.id.toString(), preferences };
    }

    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get nameMinLength(): number {
        return USER_PREFERENCES_NAME_MIN_LENGTH;
    }
    public get nameMaxLength(): number {
        return USER_PREFERENCES_NAME_MAX_LENGTH;
    }
    public get descriptionMaxLength(): number {
        return USER_PREFERENCES_DESCRIPTION_MAX_LENGTH;
    }

    public get profile(): User {
        return this._profile;
    }
    @Input()
    public set profile(value: User) {
        if (value === this._profile) {
            return;
        }
        this._profile = value;
        if (!_.isNil(value)) {
            this.commitProfileProperties();
        }
    }
}
