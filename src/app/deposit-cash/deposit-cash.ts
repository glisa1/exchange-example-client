import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-deposit-cash',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './deposit-cash.html',
  styleUrl: './deposit-cash.scss',
})
export class DepositCashComponent {
  private readonly router = inject(Router);

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
