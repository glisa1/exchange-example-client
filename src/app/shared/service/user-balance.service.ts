import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserBalance} from './user-balance.model';

@Injectable({providedIn: 'root'})
export class UserBalanceService {
  private readonly getUserBalanceUrl = 'http://localhost:5000/api/user-balance';
  private readonly httpClient = inject(HttpClient);

  public getUserBalance(userId: string): Observable<UserBalance> {
    return this.httpClient.get<UserBalance>(
      `${this.getUserBalanceUrl}/${userId}`
    );
  }
}
