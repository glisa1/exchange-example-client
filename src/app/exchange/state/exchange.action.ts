import {createAction, props} from '@ngrx/store';
import {ExchangeDataBase} from '../model/exchange-home.model';

export const loadFavoriteStocksData = createAction(
  '[Exchange] Load Favorite Stocks Data',
  props<{favoriteStocksData: Array<ExchangeDataBase>}>()
);

export const updateStockPrice = createAction(
  '[Stock] Price Update',
  props<{updatedExchangeData: ExchangeDataBase}>()
);
