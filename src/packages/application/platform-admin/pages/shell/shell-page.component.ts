import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService, ShellBaseComponent, ViewUtil } from '@ts-core/angular';
import { RouterService, SettingsService } from '@core/service';
import { takeUntil } from 'rxjs';
import { ShellMenu } from './service';
import { MatSidenavContent } from '@angular/material/sidenav';
import { Transport } from '@ts-core/common/transport';

@Component({
    templateUrl: './shell-page.component.html',
    styleUrls: ['./shell-page.component.scss']
})
export class ShellPageComponent extends ShellBaseComponent implements AfterViewInit {
    //--------------------------------------------------------------------------
    //
    // 	Properties
    //
    //--------------------------------------------------------------------------

    @ViewChild('container', { static: true })
    public container: MatSidenavContent;
    public isNeedScrollButton: boolean = false;

    //--------------------------------------------------------------------------
    //
    // 	Constructor
    //
    //--------------------------------------------------------------------------

    constructor(
        notifications: NotificationService,
        breakpointObserver: BreakpointObserver,
        element: ElementRef,
        router: RouterService,
        public settings: SettingsService,
        public menu: ShellMenu
    ) {
        super(notifications, breakpointObserver);
        ViewUtil.addClasses(element, 'd-block w-100 h-100');

        router.completed.pipe(takeUntil(this.destroyed)).subscribe(event => {
            if (!router.isUrlActive(router.previousUrl)) {
                this.scrollTop();
            }
        });
    }

    //--------------------------------------------------------------------------
    //
    // 	Protected Methods
    //
    //--------------------------------------------------------------------------

    public async ngAfterViewInit(): Promise<void> {
        this.initialize();
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Methods
    //
    //--------------------------------------------------------------------------

    public scrollTop(): void {
        this.container.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
