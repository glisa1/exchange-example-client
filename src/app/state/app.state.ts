import {ExchangeState} from '../exchange/state/exchange.state';
import {ExchangeUser} from '../shared/models/exchange-user.model';

export type UserState = ExchangeUser | null;
export interface AppState {
  user: UserState;
  exchange: ExchangeState; // <-- Add this line
}

export const initialUserState: UserState = null;
