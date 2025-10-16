import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class DepositCashService {
  private readonly depositCashUrl = 'http://localhost:5000/api/deposit-cash';
  private readonly httpClient = inject(HttpClient);

  public depositCash(amount: number, userId: string): Observable<boolean> {
    return this.httpClient
      .post(this.depositCashUrl, {
        Amount: amount,
        UserId: userId,
      })
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }
}
