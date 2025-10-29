import {
  ExchangeState,
  initialExchangeState,
} from '../exchange/state/exchange.state';
import {ExchangeDataOwned} from '../shared/models/exchange-data.model';

export type UserOwnedExchangeDataState = ExchangeDataOwned[] | null;

export interface AppState {
  exchange: ExchangeState;
  userOwnedExchangeData: UserOwnedExchangeDataState;
}

export const userOwnedExchangeDataInitialState: UserOwnedExchangeDataState =
  null;

export const initialState: AppState = {
  exchange: initialExchangeState,
  userOwnedExchangeData: userOwnedExchangeDataInitialState,
};
