import {Routes} from '@angular/router';
import {canActivateAuthRole} from './shared/guard/auth.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found-component';

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
    path: 'portfolio',
    loadComponent: () =>
      import('./portfolio/portfolio').then(m => m.PortfolioComponent),
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'deposit-cash',
    loadComponent: () =>
      import('./deposit-cash/deposit-cash').then(m => m.DepositCashComponent),
    canActivate: [canActivateAuthRole],
  },
  {
    path: 'withdraw-cash',
    loadComponent: () =>
      import('./withdraw-cash/withdraw-cash').then(
        m => m.WithdrawCashComponent
      ),
    canActivate: [canActivateAuthRole],
  },
  {
    path: '',
    loadComponent: () =>
      import('./home/home-component').then(m => m.HomeComponent),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
