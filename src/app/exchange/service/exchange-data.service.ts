import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {ExchangeData} from '../../shared/models/exchange-data.model';
import {
  MAX_MILISECONDS_TO_UPDATE,
  MAX_NUMBER_OF_EXCHANGES,
} from '../../shared/constants/exchange-data.constants';
import {HttpClient} from '@angular/common/http';
import {FetchExchangeDataModel} from '../model/exchange-home-service.model';
import {ExchangeDataBase} from '../model/exchange-home.model';

@Injectable({
  providedIn: 'root',
})
export class ExchangeDataService {
  private readonly API_URL = 'http://localhost:5000/api';
  private readonly http = inject(HttpClient);

  // public getIndexPrice(indexCode: string): Observable<ExchangeData> {
  //   return new Observable<ExchangeData>(subscriber => {
  //     const emitRandom = () => {
  //       const delay = Math.random() * MAX_MILISECONDS_TO_UPDATE;
  //       setTimeout(() => {
  //         const exchangeItem = this.exchangeDataList.find(
  //           e => e.code === indexCode
  //         );
  //         if (!exchangeItem) {
  //           subscriber.error(new Error(`Index ${indexCode} not found`));
  //           return;
  //         }

  //         subscriber.next(
  //           new ExchangeData(
  //             exchangeItem.code,
  //             exchangeItem.name,
  //             this.getRandomPrice()
  //           )
  //         );
  //         emitRandom();
  //       }, delay);
  //     };
  //     emitRandom();
  //   });
  // }

  // public addExchangeIndex(code: string, name: string): void {
  //   if (
  //     !this.exchangeDataList.some(e => e.code === code) &&
  //     this.exchangeDataList.length < MAX_NUMBER_OF_EXCHANGES
  //   ) {
  //     this.exchangeDataList.push(new ExchangeData(code, name));
  //   }
  // }

  // public removeExchangeIndex(code: string): void {
  //   this.exchangeDataList = this.exchangeDataList.filter(e => e.code !== code);
  // }

  public fetchExchangeData(): Observable<ExchangeDataBase[]> {
    return this.http
      .get<FetchExchangeDataModel[]>(`${this.API_URL}/get-all-stocks`)
      .pipe(
        map(result =>
          result.map(
            item => new ExchangeDataBase(item.ticker, item.name, item.price)
          )
        )
      );
  }

  // public get exchangeData(): Array<ExchangeData> {
  //   return this.exchangeDataList;
  // }

  // private getRandomPrice(): number {
  //   return Math.random() * 100;
  // }
}
