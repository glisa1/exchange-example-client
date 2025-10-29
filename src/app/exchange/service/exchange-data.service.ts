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
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class ExchangeDataService {
  private readonly API_URL = 'http://localhost:5000/api';
  private readonly http = inject(HttpClient);
  private readonly keycloak = inject(Keycloak);

  public fetchFavoriteStocksData(): Observable<ExchangeDataBase[]> {
    return this.http
      .get<
        FetchExchangeDataModel[]
      >(`${this.API_URL}/get-favorite-stocks?userId=${this.keycloak.subject!}`)
      .pipe(
        map(result =>
          result.map(
            item => new ExchangeDataBase(item.ticker, item.name, item.price)
          )
        )
      );
  }
}
