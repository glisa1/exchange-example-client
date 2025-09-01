import {createAction, props} from '@ngrx/store';
import {ExchangeDataOwned} from '../exchange-home/exchange-home.model';

export const buyStock = createAction(
  '[Stock] Bought',
  props<{exchangeDataBought: ExchangeDataOwned}>()
);

export const sellStock = createAction(
  '[Stock] Sold',
  props<{exchangeDataSold: ExchangeDataOwned}>()
);
