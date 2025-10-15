import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DepositCashService {
  private readonly depositCashUrl = 'http://localhost:5000/api/deposit-cash';
  private readonly httpClient = inject(HttpClient);

  public depositCash(amount: number, userId: string): void {
    this.httpClient
      .post(this.depositCashUrl, {
        Amount: amount,
        UserId: userId,
      })
      .subscribe({
        next: response => {
          console.log('Deposit successful', response);
        },
        error: error => {
          console.error('Error depositing cash', error);
        },
      });
  }
}
