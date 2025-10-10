import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-withdraw-cash',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './withdraw-cash.html',
  styleUrl: './withdraw-cash.scss',
})
export class WithdrawCashComponent {
  private readonly router = inject(Router);

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
