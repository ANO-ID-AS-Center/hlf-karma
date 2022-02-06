import { ITransportFabricChaincodeSettingsBatch, ITransportFabricSettingsBatch } from '@hlf-core/transport/chaincode/batch';
import { ApplicationBaseSettings } from '@project/module/core/settings';

export class AppSettings extends ApplicationBaseSettings implements ITransportFabricChaincodeSettingsBatch {
    // --------------------------------------------------------------------------
    //
    //  Batch Properties
    //
    // --------------------------------------------------------------------------

    public get batch(): ITransportFabricSettingsBatch {
        return {
            algorithm: this.getValue('FABRIC_BATCH_ALGORITHM', 'Ed25519'),
            timeout: this.getValue('FABRIC_BATCH_TIMEOUT', 3000),
            publicKey: this.getValue('FABRIC_BATCH_PUBLIC_KEY')
        };
    }
}
