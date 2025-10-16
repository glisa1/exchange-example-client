import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class WithdrawCashService {
  private readonly httpClient = inject(HttpClient);
  private readonly withdrawCashUrl = 'http://localhost:5000/api/withdraw';

  public withdrawCash(amount: number, userId: string): Observable<boolean> {
    return this.httpClient
      .post(this.withdrawCashUrl, {
        Amount: amount,
        UserId: userId,
      })
      .pipe(
        // Map the response to a boolean indicating success or failure
        map(() => true),
        catchError(() => of(false))
      );
  }
}
