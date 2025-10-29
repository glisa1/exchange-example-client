import {createReducer, on} from '@ngrx/store';
import {initialExchangeState} from './exchange.state';
import {loadFavoriteStocksData, updateStockPrice} from './exchange.action';

export const exchangeDataReducer = createReducer(
  initialExchangeState,
  on(loadFavoriteStocksData, (state, {favoriteStocksData}) => {
    const newState = {
      ...state,
      favoriteStocksData: favoriteStocksData,
    };
    return newState;
  }),
  on(updateStockPrice, (state, {updatedExchangeData}) => {
    if (!state.favoriteStocksData) {
      return {...state};
    }

    const newState = {...state};
    const updatedArray = state.favoriteStocksData!.map(data =>
      data.code === updatedExchangeData.code
        ? {
            ...data,
            price: updatedExchangeData.price,
            priceGrown: updatedExchangeData.price! > data.price!,
          }
        : data
    );
    newState.favoriteStocksData = updatedArray;
    return newState;
  })
);
