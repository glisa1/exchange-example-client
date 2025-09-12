import {inject, Injectable} from '@angular/core';
import {ExchangeDataUser} from './home-component.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeComponentService {
  private readonly http = inject(HttpClient);

  public registerUserToExchange(user: ExchangeDataUser): void {
    const url = 'http://localhost:5000/create-user';
    this.http.post(url, user).subscribe({
      next: response => {
        console.log('User registered successfully:', response);
      },
      error: error => {
        console.error('Registration failed:', error);
      },
    });
  }
}
