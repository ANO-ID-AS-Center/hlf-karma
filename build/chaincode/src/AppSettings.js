"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettings = void 0;
const settings_1 = require("@project/module/core/settings");
class AppSettings extends settings_1.ApplicationBaseSettings {
    get batch() {
        return {
            algorithm: this.getValue('FABRIC_BATCH_ALGORITHM', 'Ed25519'),
            timeout: this.getValue('FABRIC_BATCH_TIMEOUT', 3000),
            publicKey: this.getValue('FABRIC_BATCH_PUBLIC_KEY')
        };
    }
}
exports.AppSettings = AppSettings;
