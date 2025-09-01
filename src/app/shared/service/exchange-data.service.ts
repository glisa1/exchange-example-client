import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ExchangeData} from '../models/exchange-data.model';
import {
  MAX_MILISECONDS_TO_UPDATE,
  MAX_NUMBER_OF_EXCHANGES,
} from '../constants/exchange-data.constants';

@Injectable({
  providedIn: 'root',
})
export class ExchangeDataService {
  private exchangeDataList: Array<ExchangeData> = [
    {
      code: 'APS',
      name: 'Apsara',
    } as ExchangeData,
    {
      code: 'GSA',
      name: 'Gassa',
    } as ExchangeData,
    {
      code: 'NCC',
      name: 'Necco',
    } as ExchangeData,
  ];
  constructor() {}

  public getIndexPrice(indexCode: string): Observable<ExchangeData> {
    return new Observable<ExchangeData>(subscriber => {
      const emitRandom = () => {
        const delay = Math.random() * MAX_MILISECONDS_TO_UPDATE;
        setTimeout(() => {
          const exchangeItem = this.exchangeDataList.find(
            e => e.code === indexCode
          );
          if (!exchangeItem) {
            subscriber.error(new Error(`Index ${indexCode} not found`));
            return;
          }

          subscriber.next(
            new ExchangeData(
              exchangeItem.code,
              exchangeItem.name,
              this.getRandomPrice()
            )
          );
          emitRandom();
        }, delay);
      };
      emitRandom();
    });
  }

  public addExchangeIndex(code: string, name: string): void {
    if (
      !this.exchangeDataList.some(e => e.code === code) &&
      this.exchangeDataList.length < MAX_NUMBER_OF_EXCHANGES
    ) {
      this.exchangeDataList.push(new ExchangeData(code, name));
    }
  }

  public removeExchangeIndex(code: string): void {
    this.exchangeDataList = this.exchangeDataList.filter(e => e.code !== code);
  }

  public get exchangeData(): Array<ExchangeData> {
    return this.exchangeDataList;
  }

  private get exchangeDataLength(): number {
    return this.exchangeDataList.length;
  }

  private getRandomPrice(): number {
    return Math.random() * 100;
  }
}
