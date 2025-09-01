import {inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../../state/app.state';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.store
      .select(state => state.user)
      .pipe(
        map(user => {
          if (!user) {
            this.router.navigate(['']);
            return false;
          }
          return true;
        })
      );
  }
}
