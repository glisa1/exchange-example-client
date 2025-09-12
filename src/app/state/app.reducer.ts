import {ActionReducerMap} from '@ngrx/store';
import {AppState} from './app.state';
import {userOwnedExchangeDataReducer} from '../exchange/state/exchange.reducer';

export const reducers: ActionReducerMap<AppState> = {
  exchange: userOwnedExchangeDataReducer,
};
