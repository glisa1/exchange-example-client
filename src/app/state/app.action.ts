import {createAction, props} from '@ngrx/store';
import {ExchangeUser} from '../shared/models/exchange-user.model';

export const userLogin = createAction(
  '[User] Set',
  props<{user: ExchangeUser}>()
);

export const userLogout = createAction('[User] Logout');
