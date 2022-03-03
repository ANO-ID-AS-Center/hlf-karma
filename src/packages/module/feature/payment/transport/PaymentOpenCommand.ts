import { LoadableStatus } from '@ts-core/common';
import { ExtendedError } from '@ts-core/common/error';
import { TransportCommandAsync } from '@ts-core/common/transport';
import { IPaymentAggregatorGetDto } from '../../../../../externals/common/platform/api/payment';

export class PaymentOpenCommand extends TransportCommandAsync<IPaymentOpenDto, IPaymentOpenDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = 'PaymentOpenCommand';

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IPaymentOpenDto) {
        super(PaymentOpenCommand.NAME, request);
    }
}

export interface IPaymentOpenDto extends IPaymentAggregatorGetDto { }
export interface IPaymentOpenDtoResponse {}

export enum PaymentOpenResult {
    ERRORED = 'ERRORED',
    COMPLETED = 'COMPLETED',
}
