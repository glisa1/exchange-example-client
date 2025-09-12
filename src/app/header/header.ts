import {Component, inject} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class HeaderComponent {
  private readonly keycloak = inject(Keycloak);
  public user$ = this.keycloak.loadUserProfile();

  public logout(): void {
    this.keycloak.logout({redirectUri: window.location.origin});
  }
}
