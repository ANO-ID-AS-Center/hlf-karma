import { WindowService, ListItems, IListItem, ListItem } from '@ts-core/angular';
import { LanguageService } from '@ts-core/frontend/language';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { Transport } from '@ts-core/common/transport';
import { UserEditCommand } from '../transport';
import { UserService } from '@core/service';

@Injectable({ providedIn: 'root' })
export class UserMenu extends ListItems<IListItem<void>> {
    // --------------------------------------------------------------------------
    //
    //	Constants
    //
    // --------------------------------------------------------------------------

    private static EDIT = 10;
    private static CRYPTO_KEY_CHANGE = 20;
    private static REMOVE = 1000;

    // --------------------------------------------------------------------------
    //
    //	Properties
    //
    // --------------------------------------------------------------------------

    constructor(language: LanguageService, transport: Transport, service: UserService) {
        super(language);

        let item: IListItem<void> = null;

        item = new ListItem('general.edit', UserMenu.EDIT, null, 'fas fa-edit mr-2');
        item.checkEnabled = (item, user) => service.isAdministrator || service.isUser(user);
        item.action = (item, user) => transport.send(new UserEditCommand(user.id));
        this.add(item)
        /*
        item = new ListItem('user.cryptoKeyChange', UserMenu.CRYPTO_KEY_CHANGE, null, 'fas fa-key mr-2');
        item.action = (item, user) => transport.send(new UserCryptoKeyChangeCommand(user));
        this.add(item);

        item = new ListItem('general.remove', UserMenu.REMOVE, null, 'fas fa-times-circle mr-2');
        item.className = 'text-danger';
        item.action = (item, user) => transport.send(new UserRemoveCommand(user));
        this.add(item);
        */

        this.complete();
    }
}
