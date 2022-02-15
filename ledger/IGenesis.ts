export interface IGenesis {
    rootUserUid: string;
    rootCompanyUid: string;
    createdDate: Date;
}

import { TransportCryptoManagerEd25519 } from "@ts-core/common/transport/crypto";
export const ROOT_USER_CRYPTO_KEY = 'e365007e85508c6b44d5101a1d59d0061a48fd1bcd393186ccb5e7ae938a59a8';
export const ROOT_USER_CRYPTO_ALGORITHM = TransportCryptoManagerEd25519.ALGORITHM;
