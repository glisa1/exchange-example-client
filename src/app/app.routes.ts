import {Routes} from '@angular/router';
import {canActivateAuthRole} from './shared/guard/auth.guard';

export const routes: Routes = [
  {
    path: 'exchange',
    loadComponent: () =>
      import('./exchange/exchange-home/exchange-home').then(
        m => m.ExchangeHomeComponent
      ),
    canActivate: [canActivateAuthRole],
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home-component').then(m => m.HomeComponent),
  },
];
