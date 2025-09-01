import {ExchangeDataOwned} from '../exchange-home/exchange-home.model';

export type UserOwnedExchangeDataState = ExchangeDataOwned[] | null;

export interface ExchangeState {
  userOwnedExchangeData: UserOwnedExchangeDataState;
}

export const initialExchangeState: ExchangeState = {
  userOwnedExchangeData: null,
};
