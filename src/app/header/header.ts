import {Component, inject} from '@angular/core';
import {AppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class HeaderComponent {
  private readonly router = inject(Router);
  private readonly keycloak = inject(Keycloak);
  public user$ = this.keycloak.loadUserProfile();

  public logout(): void {
    this.keycloak.logout({redirectUri: window.location.origin});
  }
}
