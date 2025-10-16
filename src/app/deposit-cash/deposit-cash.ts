import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {Router} from '@angular/router';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {DepositCashService} from './deposit-cash.service';
import Keycloak from 'keycloak-js';
import {UserBalanceService} from '../shared/service/user-balance.service';
import {Subscription} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-deposit-cash',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './deposit-cash.html',
  styleUrl: './deposit-cash.scss',
})
export class DepositCashComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly depositCashService = inject(DepositCashService);
  private readonly userBalanceService = inject(UserBalanceService);
  private readonly keycloak = inject(Keycloak);
  private readonly snackBar = inject(MatSnackBar);

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

  public depositCashForm = this.formBuilder.group({
    amount: [0, [Validators.required, Validators.min(1)]],
  });

  public navigateToHome(): void {
    this.router.navigate(['/']);
  }

  public onDepositCashFormSubmit(): void {
    this.depositCashService
      .depositCash(this.amount, this.keycloak.subject!)
      .subscribe(success => {
        if (success) {
          this.openSnackBar('Deposit successful');
          this.navigateToHome();
        } else {
          this.openSnackBar('Error depositing cash');
        }
      });
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {duration: 3000});
  }

  public get amountFormControl(): FormControl {
    return this.depositCashForm.get('amount') as FormControl;
  }

  public get amount(): number {
    return this.amountFormControl.value;
  }

  public get amountOfCashAfterDeposit(): number {
    return this.currentAmountOfCash() + this.amount;
  }
}
