import {createAction, props} from '@ngrx/store';
import {
  ExchangeDataBase,
  ExchangeDataOwned,
} from '../model/exchange-home.model';

export const buyStock = createAction(
  '[Stock] Bought',
  props<{exchangeDataBought: ExchangeDataOwned}>()
);

export const sellStock = createAction(
  '[Stock] Sold',
  props<{exchangeDataSold: ExchangeDataOwned}>()
);

export const loadExchangeData = createAction(
  '[Exchange] Load Data',
  props<{exchangeData: Array<ExchangeDataBase>}>()
);

export const updateStockPrice = createAction(
  '[Stock] Price Update',
  props<{updatedExchangeData: ExchangeDataBase}>()
);
