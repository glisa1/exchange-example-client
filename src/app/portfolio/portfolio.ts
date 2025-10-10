import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-portfolio',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss',
})
export class PortfolioComponent {
  private readonly router = inject(Router);

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }
}
