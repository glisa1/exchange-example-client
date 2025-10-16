import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserBalanceService} from '../shared/service/user-balance.service';
import Keycloak from 'keycloak-js';
import {CurrencyPipe, NgClass} from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {WithdrawCashService} from './withdraw-cash.service';

@Component({
  selector: 'app-withdraw-cash',
  imports: [
    NgClass,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './withdraw-cash.html',
  styleUrl: './withdraw-cash.scss',
})
export class WithdrawCashComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly userBalanceService = inject(UserBalanceService);
  private readonly keycloak = inject(Keycloak);
  private readonly withdrawCashService = inject(WithdrawCashService);
  private balanceSubscription: Subscription = Subscription.EMPTY;

  public message = '';
  public currentAmountOfCash = signal(0);

  ngOnInit(): void {
    this.balanceSubscription = this.userBalanceService
      .getUserBalance(this.keycloak.subject!)
      .subscribe(userBalance => {
        this.currentAmountOfCash.set(userBalance.balance);
      });
  }

  ngOnDestroy(): void {
    this.balanceSubscription.unsubscribe();
  }

  public withdrawCashForm = this.formBuilder.group({
    amount: [0, [Validators.required, Validators.min(1)]],
  });

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }

  public onWithdrawCashFormSubmit(): void {
    this.withdrawCashService.withdrawCash(this.amount, this.keycloak.subject!);
    this.navigateToHome();
  }

  public get amountFormControl(): FormControl {
    return this.withdrawCashForm.get('amount') as FormControl;
  }

  public get amount(): number {
    return this.amountFormControl.value;
  }

  public get amountOfCashAfterWithdraw(): number {
    return this.currentAmountOfCash() - this.amount || 0;
  }

  public get canWithdrawCash(): boolean {
    return this.withdrawCashForm.valid && this.amountOfCashAfterWithdraw >= 0;
  }
}
