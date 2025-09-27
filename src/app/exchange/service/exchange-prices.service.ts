import {inject, Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {ExchangeDataBase} from '../model/exchange-home.model';
import {ExchangeState} from '../state/exchange.state';
import {Store} from '@ngrx/store';
import {updateStockPrice} from '../state/exchange.action';

@Injectable({providedIn: 'root'})
export class ExchangePricesService {
  private hubConnection?: signalR.HubConnection;
  private readonly store = inject(Store<ExchangeState>);

  startRecievingPriceUpdates(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/hubs/exchange-prices')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch(err => console.error('SignalR error', err));

    this.hubConnection.on('ExchangePriceUpdate', (msg: string) => {
      const parsedMsg = JSON.parse(msg);

      const exchangeDataUpdate = new ExchangeDataBase(
        parsedMsg.Ticker,
        parsedMsg.StockName,
        parsedMsg.Price
      );

      this.store.dispatch(
        updateStockPrice({updatedExchangeData: exchangeDataUpdate})
      );
    });
  }

  stop(): void {
    this.hubConnection
      ?.stop()
      .catch(err => console.error('SignalR error', err));
  }
}
