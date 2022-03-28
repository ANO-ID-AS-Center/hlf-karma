
import { TransportCommandAsync } from '@ts-core/common/transport';
import { PaymentTarget } from '@common/platform/payment';
import { PaymentAggregator } from '@project/common/platform/payment/aggregator';

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

export interface IPaymentOpenDto {
    target: PaymentTarget;
    details: string;
    aggregator: Partial<PaymentAggregator>;

    amount: number;
    currency: string;
}
export interface IPaymentOpenDtoResponse { }

export enum PaymentOpenResult {
    ERRORED = 'ERRORED',
    COMPLETED = 'COMPLETED',
}
