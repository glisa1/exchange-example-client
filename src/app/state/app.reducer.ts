import {ActionReducerMap, createReducer, on} from '@ngrx/store';
import {AppState, initialUserState} from './app.state';
import {userLogin, userLogout} from './app.action';
import {userOwnedExchangeDataReducer} from '../exchange/state/exchange.reducer';

export const userReducer = createReducer(
  initialUserState,
  on(userLogin, (state, {user}) => user),
  on(userLogout, () => initialUserState)
);

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
  exchange: userOwnedExchangeDataReducer,
};
