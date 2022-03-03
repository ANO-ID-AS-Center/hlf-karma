import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '@ts-core/frontend/language';
import { PipeBaseService } from '@ts-core/angular';
import { UserTitlePipe } from '@shared/pipe';


@Injectable({ providedIn: 'root' })
export class PipeService extends PipeBaseService {
    //--------------------------------------------------------------------------
    //
    // 	Constants
    //
    //--------------------------------------------------------------------------

    private static USER_TITLE: UserTitlePipe;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(language: LanguageService, sanitizer: DomSanitizer) {
        super(language, sanitizer);
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public get userTitle(): UserTitlePipe {
        if (!PipeService.USER_TITLE) {
            PipeService.USER_TITLE = new UserTitlePipe(this.language);
        }
        return PipeService.USER_TITLE;
    }

}
