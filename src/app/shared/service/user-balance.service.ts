import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserBalanceService {
  private readonly getUserBalanceUrl = 'http://localhost:5000/api/user-balance';
  private readonly httpClient = inject(HttpClient);

  public getUserBalance(userId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.getUserBalanceUrl}/${userId}`);
  }
}
