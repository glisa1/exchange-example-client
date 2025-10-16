import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class WithdrawCashService {
  private readonly httpClient = inject(HttpClient);
  private readonly withdrawCashUrl = 'http://localhost:5000/api/withdraw';

  public withdrawCash(amount: number, userId: string): void {
    this.httpClient
      .post(this.withdrawCashUrl, {
        Amount: amount,
        UserId: userId,
      })
      .subscribe({
        next: response => {
          console.log('Withdraw successful', response);
        },
        error: error => {
          console.error('Error withdrawing cash', error);
        },
      });
  }
}
