import {createReducer, on} from '@ngrx/store';
import {initialExchangeState} from './exchange.state';
import {buyStock, sellStock} from './exchange.action';

export const userOwnedExchangeDataReducer = createReducer(
  initialExchangeState,
  on(buyStock, (state, {exchangeDataBought}) => {
    if (!state.userOwnedExchangeData) {
      const newState = {
        userOwnedExchangeData: [exchangeDataBought],
      };
      console.log('New user owned exchange state after buy:', newState);
      return newState;
    }

    const newState = {
      ...state,
    };
    const existingEntryIndex = newState.userOwnedExchangeData?.findIndex(
      data => data.code === exchangeDataBought.code
    );

    if (existingEntryIndex === undefined || existingEntryIndex < 0) {
      newState.userOwnedExchangeData = [
        ...(newState.userOwnedExchangeData ?? []),
        exchangeDataBought,
      ];
    } else {
      const updatedArray = state.userOwnedExchangeData!.map(data =>
        data.code === exchangeDataBought.code
          ? {...data, amount: data.amount + exchangeDataBought.amount}
          : data
      );
      newState.userOwnedExchangeData = updatedArray;
    }

    console.log('New user owned exchange state after buy:', newState);

    return newState;
  }),
  on(sellStock, (state, {exchangeDataSold}) => {
    if (!state.userOwnedExchangeData) {
      return {...state};
    }

    const newState = {
      ...state,
    };

    let shouldRemoveEntry = false;

    const updatedArray = state.userOwnedExchangeData!.map(data => {
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

    newState.userOwnedExchangeData = updatedArray;

    console.log('New user owned exchange state after sell:', newState);

    return newState;
  })
);
