import {ActionReducerMap, createReducer, on} from '@ngrx/store';
import {AppState, userOwnedExchangeDataInitialState} from './app.state';
import {buyStock, sellStock} from './app.action';
import {exchangeDataReducer} from '../exchange/state/exchange.reducer';

const userOwnedExchangeDataReducer = createReducer(
  userOwnedExchangeDataInitialState,
  on(buyStock, (state, {exchangeDataBought}) => {
    if (!state) {
      const newState = [exchangeDataBought];

      return newState;
    }

    let newState = state;
    const existingEntryIndex = newState.findIndex(
      data => data.code === exchangeDataBought.code
    );

    if (existingEntryIndex === undefined || existingEntryIndex < 0) {
      newState = [...(newState ?? []), exchangeDataBought];
    } else {
      const updatedArray = state.map(data =>
        data.code === exchangeDataBought.code
          ? {...data, amount: data.amount + exchangeDataBought.amount}
          : data
      );
      newState = updatedArray;
    }

    return newState;
  }),
  on(sellStock, (state, {exchangeDataSold}) => {
    if (!state) {
      return state;
    }

    let newState = state;

    let shouldRemoveEntry = false;

    const updatedArray = state.map(data => {
      if (data.code === exchangeDataSold.code) {
        const newValue = data.amount - exchangeDataSold.amount;
        if (newValue <= 0) {
          shouldRemoveEntry = true;
        }
        return {...data, amount: newValue};
      }

      return data;
    });

    if (shouldRemoveEntry) {
      updatedArray.splice(
        updatedArray.findIndex(item => item.code === exchangeDataSold.code),
        1
      );
    }

    newState = updatedArray;

    return newState;
  })
);

export const reducers: ActionReducerMap<AppState> = {
  exchange: exchangeDataReducer,
  userOwnedExchangeData: userOwnedExchangeDataReducer,
};
