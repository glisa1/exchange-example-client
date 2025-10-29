import {ExchangeDataBase} from '../model/exchange-home.model';

export type ExchangeDataState = ExchangeDataBase[] | null;

export interface ExchangeState {
  favoriteStocksData: ExchangeDataState;
}

export const initialExchangeState: ExchangeState = {
  favoriteStocksData: null,
};
