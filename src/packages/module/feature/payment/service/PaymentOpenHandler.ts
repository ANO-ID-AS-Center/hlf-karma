import { Injectable } from '@angular/core';
import { Logger } from '@ts-core/common/logger';
import { Transport, TransportCommandAsyncHandler } from '@ts-core/common/transport';
import * as _ from 'lodash';
import { Client } from '@common/platform/api';
import { PaymentOpenCommand } from '../transport';
import { IPaymentOpenDto, IPaymentOpenDtoResponse } from '../transport/PaymentOpenCommand';
import { PaymentService } from './PaymentService';

@Injectable({ providedIn: 'root' })
export class PaymentOpenHandler extends TransportCommandAsyncHandler<IPaymentOpenDto, IPaymentOpenDtoResponse, PaymentOpenCommand> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(transport: Transport, logger: Logger, private api: Client, private service: PaymentService) {
        super(logger, transport, PaymentOpenCommand.NAME);
    }

    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------

    protected async execute(params: IPaymentOpenDto): Promise<IPaymentOpenDtoResponse> {
        return this.service.getAggregator(params.aggregator.type).open(params);
    }
}
