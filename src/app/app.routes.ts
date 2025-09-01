import {Routes} from '@angular/router';
import {AuthGuard} from './shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'exchange',
    loadComponent: () =>
      import('./exchange/exchange-home/exchange-home').then(
        m => m.ExchangeHomeComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home-component').then(m => m.HomeComponent),
  },
];
