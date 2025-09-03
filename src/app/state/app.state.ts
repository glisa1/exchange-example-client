import {ExchangeState} from '../exchange/state/exchange.state';
import {ExchangeUser} from '../shared/models/exchange-user.model';

export interface AppState {
  exchange: ExchangeState;
}
