import { CompanyPreferences, COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH, COMPANY_PREFERENCES_EMAIL_MAX_LENGTH, COMPANY_PREFERENCES_INN_MAX_LENGTH, COMPANY_PREFERENCES_INN_MIN_LENGTH, COMPANY_PREFERENCES_PHONE_MAX_LENGTH, COMPANY_PREFERENCES_TITLE_MAX_LENGTH, COMPANY_PREFERENCES_TITLE_MIN_LENGTH, COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH } from "@project/common/platform/company";
import { IWindowContent } from "@ts-core/angular";

export class CompanyBaseComponent extends IWindowContent {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    protected _preferences: CompanyPreferences;

    //--------------------------------------------------------------------------
    //
    //  Public Methods
    //
    //--------------------------------------------------------------------------

    public destroy(): void {
        if (this.isDestroyed) {
            return;
        }
        super.destroy();
        this._preferences = null;
    }
    //--------------------------------------------------------------------------
    //
    //  Public Properties
    //
    //--------------------------------------------------------------------------

    public get preferences(): CompanyPreferences {
        return this._preferences;
    }

    public get phoneMaxLength(): number {
        return COMPANY_PREFERENCES_PHONE_MAX_LENGTH;
    }
    public get websiteMaxLength(): number {
        return COMPANY_PREFERENCES_WEBSITE_MAX_LENGTH;
    }
    public get addressMaxLength(): number {
        return COMPANY_PREFERENCES_ADDRESS_MAX_LENGTH;
    }
    public get emailMaxLength(): number {
        return COMPANY_PREFERENCES_EMAIL_MAX_LENGTH;
    }
    public get innMinLength(): number {
        return COMPANY_PREFERENCES_INN_MIN_LENGTH;
    }
    public get innMaxLength(): number {
        return COMPANY_PREFERENCES_INN_MAX_LENGTH;
    }
    public get titleMinLength(): number {
        return COMPANY_PREFERENCES_TITLE_MIN_LENGTH;
    }
    public get titleMaxLength(): number {
        return COMPANY_PREFERENCES_TITLE_MAX_LENGTH;
    }
}