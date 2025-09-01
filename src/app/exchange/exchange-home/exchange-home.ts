import {Component, computed, inject, OnDestroy, signal} from '@angular/core';
import {ExchangeDataService} from '../../shared/service/exchange-data.service';
import {map, Subscription} from 'rxjs';
import {ExchangeData} from '../../shared/models/exchange-data.model';
import {
  ExchangeDataBase,
  ExchangeDataEuro,
  ExchangeDataOwned,
} from './exchange-home.model';
import {CommonModule, CurrencyPipe, NgClass} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  DOLAR_TO_EURO_CONVERSION_RATE,
  MAX_NUMBER_OF_EXCHANGES,
  MIN_NUMBER_OF_EXCHANGES,
} from '../../shared/constants/exchange-data.constants';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {ExchangeState} from '../state/exchange.state';
import {buyStock, sellStock} from '../state/exchange.action';

@Component({
  selector: 'app-exchange-home',
  imports: [NgClass, CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './exchange-home.html',
  styleUrl: './exchange-home.scss',
  standalone: true,
})
export class ExchangeHomeComponent implements OnDestroy {
  private readonly exchangeSubscriptions: Map<string, Subscription> = new Map<
    string,
    Subscription
  >();
  private readonly exchangeService: ExchangeDataService =
    inject(ExchangeDataService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<ExchangeState>);

  public exchangeData?: Array<ExchangeDataEuro>;
  public newIndexCode: string = '';

  public canAddIndex = signal(true);
  public canRemoveIndex = signal(true);
  public connectedToExchange = signal(false);
  public trackingAnyIndex = signal(false);
  public canTrackNewIndex = computed(() => {
    return this.connectedToExchange() && this.canAddIndex();
  });

  public disconnectFromExchange(): void {
    this.unsubscribeFromAllExchanges();
    this.connectedToExchange.set(false);
  }

  public connectToExchange(): void {
    this.syncExchangeData();
    this.connectedToExchange.set(true);
  }

  public addExchangeIndex(): void {
    const newIndexCode = this.newIndexCode.trim().toUpperCase();
    if (newIndexCode === '') {
      return;
    }

    if (this.exchangeData?.some(e => e.code === newIndexCode)) {
      this.newIndexCode = '';
      return;
    }

    const newIndexName = `${newIndexCode}_name`;

    this.exchangeService.addExchangeIndex(newIndexCode, newIndexName);
    this.exchangeData?.push(new ExchangeDataEuro(newIndexCode, newIndexName));
    this.exchangeSubscriptions.set(
      newIndexCode,
      this.getIndexPriceSubscription(newIndexCode)
    );

    this.newIndexCode = '';
    this.updateAddAndRemoveIndexSignals();
  }

  public removeExchangeIndex(code: string): void {
    this.exchangeService.removeExchangeIndex(code);
    this.exchangeData = this.exchangeData?.filter(e => e.code !== code);
    this.exchangeSubscriptions.get(code)?.unsubscribe();
    this.exchangeSubscriptions.delete(code);
    this.updateAddAndRemoveIndexSignals();
    this.updateAnyIndexTrackingSignal();
  }

  public nabigateToHome(): void {
    this.router.navigate(['/']);
  }

  public get totalPriceValue(): number {
    return (
      this.exchangeData?.reduce((sum, item) => sum + (item.price ?? 0), 0) ?? 0
    );
  }

  public get totalPriceEuroValue(): number {
    return (
      this.exchangeData?.reduce(
        (sum, item) => sum + (item.priceEuro ?? 0),
        0
      ) ?? 0
    );
  }

  public buyStockAmount(
    code: string,
    amountInputElement: HTMLInputElement
  ): void {
    const amountValue = parseFloat(amountInputElement.value);
    if (!this.isParsedFloadValid(amountValue)) {
      return;
    }

    if (!this.validateStockOptionExists(code)) {
      return;
    }

    this.dispatchStockBuyAction(code, amountValue);
    this.clearNumberInputAfterUse(amountInputElement);
  }

  public sellStockAmount(
    code: string,
    amountInputElement: HTMLInputElement
  ): void {
    const amountValue = parseFloat(amountInputElement.value);
    if (!this.isParsedFloadValid(amountValue)) {
      return;
    }

    if (!this.validateStockOptionExists(code)) {
      return;
    }

    this.dispatchStockSellAction(code, amountValue);
    this.clearNumberInputAfterUse(amountInputElement);
  }

  public getOwnedStockAmount(stockCode: string): number | undefined {
    const userOwnedExchangeData = this.store.selectSignal<ExchangeDataOwned[]>(
      state => state.exchange.userOwnedExchangeData
    );
    return userOwnedExchangeData()?.find(e => e.code === stockCode)?.amount;
  }

  public getOwnedStockAmountValue(stockCode: string): number | undefined {
    const ownedStockAmount = this.getOwnedStockAmount(stockCode);
    if (!ownedStockAmount) {
      return 0;
    }

    const exchangeDataItem = this.exchangeData?.find(e => e.code === stockCode);
    return (exchangeDataItem?.price ?? 0) * ownedStockAmount;
  }

  public getOwnedStockAmountValueEur(stockCode: string): number | undefined {
    const ownedStockValue = this.getOwnedStockAmountValue(stockCode);

    return ownedStockValue! * DOLAR_TO_EURO_CONVERSION_RATE;
  }

  public canBuyOrSellStock(stockCode: string): boolean {
    return !!this.exchangeData?.find(
      exchangeData => exchangeData.code === stockCode
    )?.price;
  }

  private syncExchangeData(): void {
    if (!this.exchangeData || this.exchangeData!.length === 0) {
      this.exchangeData = this.exchangeService.exchangeData.map(exchangeData =>
        ExchangeDataBase.fromObject(exchangeData)
      );
    }

    this.updateAnyIndexTrackingSignal();

    this.exchangeData!.forEach(exchangeData => {
      this.exchangeSubscriptions.set(
        exchangeData.code,
        this.getIndexPriceSubscription(exchangeData.code)
      );
    });
  }

  private updateAddAndRemoveIndexSignals(): void {
    if (this.exchangeData!.length === MAX_NUMBER_OF_EXCHANGES) {
      this.canAddIndex.set(false);
    } else {
      this.canAddIndex.set(true);
    }

    if (this.exchangeData!.length === MIN_NUMBER_OF_EXCHANGES) {
      this.canRemoveIndex.set(false);
    } else {
      this.canRemoveIndex.set(true);
    }
  }

  private updateAnyIndexTrackingSignal(): void {
    this.exchangeData!.length > 0
      ? this.trackingAnyIndex.set(true)
      : this.trackingAnyIndex.set(false);
  }

  private getIndexPriceSubscription(indexCode: string): Subscription {
    return this.exchangeService
      .getIndexPrice(indexCode)
      .pipe(
        map((value: ExchangeData) => {
          const existingExchangeData = this.exchangeData!.find(
            e => e.code === value.code
          );

          let priceGrown = existingExchangeData!.priceGrown ?? false;
          if (value.price! > existingExchangeData?.price!) {
            priceGrown = true;
          } else if (value.price! < existingExchangeData?.price!) {
            priceGrown = false;
          }

          return new ExchangeDataBase(
            value.code,
            value.name,
            value.price!,
            priceGrown
          );
        })
      )
      .pipe(
        map((value: ExchangeData) => {
          const exchangeData = ExchangeDataEuro.fromObject(value);
          exchangeData.priceEuro =
            exchangeData.price! * DOLAR_TO_EURO_CONVERSION_RATE; // Example conversion rate
          return exchangeData;
        })
      )
      .subscribe(value => {
        const existingExchangeDataIndex = this.exchangeData!.findIndex(
          e => e.code === value.code
        );

        this.exchangeData![existingExchangeDataIndex] = value;
      });
  }

  private unsubscribeFromAllExchanges(): void {
    this.exchangeSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.exchangeSubscriptions.clear();
  }

  private dispatchStockBuyAction(stockCode: string, amount: number): void {
    const exchangeDataBought = new ExchangeDataOwned(stockCode, amount);
    this.store.dispatch(buyStock({exchangeDataBought: exchangeDataBought}));
  }

  private dispatchStockSellAction(stockCode: string, amount: number): void {
    const exchangeDataBought = new ExchangeDataOwned(stockCode, amount);
    this.store.dispatch(sellStock({exchangeDataSold: exchangeDataBought}));
  }

  private clearNumberInputAfterUse(amountInputElement: HTMLInputElement): void {
    amountInputElement.value = '0';
  }

  private isParsedFloadValid(amountValue: number): boolean {
    if (isNaN(amountValue) || amountValue <= 0) {
      return false;
    }

    return true;
  }

  private validateStockOptionExists(stockCode: string): boolean {
    return this.exchangeData?.some(e => e.code === stockCode) ?? false;
  }

  ngOnDestroy(): void {
    this.unsubscribeFromAllExchanges();
  }
}
