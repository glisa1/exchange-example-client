import {
  ExchangeDataBase,
  ExchangeDataOwned,
} from '../model/exchange-home.model';

export type UserOwnedExchangeDataState = ExchangeDataOwned[] | null;
export type ExchangeDataState = ExchangeDataBase[] | null;

export interface ExchangeState {
  userOwnedExchangeData: UserOwnedExchangeDataState;
  exchangeData: ExchangeDataState;
}

export const initialExchangeState: ExchangeState = {
  userOwnedExchangeData: null,
  exchangeData: null,
};
