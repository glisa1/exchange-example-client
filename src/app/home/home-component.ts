import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ExchangeUser} from '../shared/models/exchange-user.model';
import {userLogin} from '../state/app.action';
import {AppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {toSignal} from '@angular/core/rxjs-interop';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
  standalone: true,
})
export class HomeComponent {
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);
  private readonly keycloak = inject(Keycloak);
  private user$ = this.store.select(state => state.user);

  public userSignal = toSignal(this.user$, {initialValue: null});
  public userFirstName = '';
  public userLastName = '';

  public navigateToExchange(): void {
    // if (!this.userSignal()) {
    //   if (!this.validateUserInput()) {
    //     return;
    //   }

    //   this.dispatchUserLogin();
    // }

    if (!this.keycloak.authenticated) {
      this.keycloak.login({redirectUri: window.location.origin + '/exchange'});
      return;
    }

    this.router.navigate(['/exchange']);
  }

  public async registerUser(): Promise<void> {
    await this.keycloak.register({
      redirectUri: window.location.origin + '/exchange',
    });
  }

  private validateUserInput(): boolean {
    if (this.userSignal()) {
      return true;
    }
    return this.userFirstName.trim() !== '' && this.userLastName.trim() !== '';
  }

  private dispatchUserLogin(): void {
    this.store.dispatch(
      userLogin({user: new ExchangeUser(this.userFirstName, this.userLastName)})
    );
  }
}
