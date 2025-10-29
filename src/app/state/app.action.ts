import {createAction, props} from '@ngrx/store';
import {ExchangeDataOwned} from '../shared/models/exchange-data.model';

export const buyStock = createAction(
  '[Stock] Bought',
  props<{exchangeDataBought: ExchangeDataOwned}>()
);

export const sellStock = createAction(
  '[Stock] Sold',
  props<{exchangeDataSold: ExchangeDataOwned}>()
);
