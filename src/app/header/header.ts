import {Component, inject} from '@angular/core';
import {AppState} from '../state/app.state';
import {Store} from '@ngrx/store';
import {AsyncPipe} from '@angular/common';
import {userLogout} from '../state/app.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
})
export class HeaderComponent {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  public user$ = this.store.select(state => state.user);

  public logout(): void {
    this.store.dispatch(userLogout());
    this.router.navigate(['']);
  }
}
