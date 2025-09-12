import {Component, computed, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import Keycloak from 'keycloak-js';
import {HomeComponentService} from './home-component.service';
import {ExchangeDataUser} from './home-component.model';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly keycloak = inject(Keycloak);
  private readonly homeComponentService = inject(HomeComponentService);

  public isAuthenticatedSignal = computed(() => this.keycloak.authenticated);

  ngOnInit(): void {
    if (this.keycloak.authenticated) {
      const user: ExchangeDataUser = new ExchangeDataUser(
        this.keycloak.tokenParsed?.['preferred_username']!,
        this.keycloak.tokenParsed?.['email'],
        this.keycloak.subject!
      );
      this.homeComponentService.registerUserToExchange(user);
    }
  }

  public login(): void {
    this.keycloak.login();
  }

  public async registerUser(): Promise<void> {
    await this.keycloak.register();
  }

  public goToExchange(): void {
    this.router.navigate(['/exchange']);
  }
}
