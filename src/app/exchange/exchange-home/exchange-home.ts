import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {ExchangeDataService} from '../service/exchange-data.service';
import {ExchangeDataBase, ExchangeDataEuro} from '../model/exchange-home.model';
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
import {loadFavoriteStocksData} from '../state/exchange.action';
import {ExchangePricesService} from '../service/exchange-prices.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ExchangeDataOwned} from '../../shared/models/exchange-data.model';
import {buyStock, sellStock} from '../../state/app.action';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-exchange-home',
  imports: [
    NgClass,
    CommonModule,
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './exchange-home.html',
  styleUrl: './exchange-home.scss',
  standalone: true,
})
export class ExchangeHomeComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.store
      .select(state => state.exchange.favoriteStocksData)
      .subscribe((favoriteStockDataInStore: ExchangeDataBase[]) => {
        if (!favoriteStockDataInStore) {
          this.exchangeService.fetchFavoriteStocksData().subscribe({
            next: (favoriteStockData: ExchangeDataBase[]) => {
              this.dispatchLoadFavoriteStocksAction(favoriteStockData);
              favoriteStockDataInStore = favoriteStockData;
            },
          });
        }

        this.favoriteStocksData = favoriteStockDataInStore?.map(
          favoriteStocksData => ExchangeDataEuro.fromObject(favoriteStocksData)
        );
      });

    this.exchangePricesService.startRecievingPriceUpdates();
  }

  private readonly exchangeService: ExchangeDataService =
    inject(ExchangeDataService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<ExchangeState>);
  private readonly exchangePricesService = inject(ExchangePricesService);

  public favoriteStocksData?: Array<ExchangeDataEuro>;
  public newIndexCode: string = '';

  public canAddIndex = signal(true);
  public canRemoveIndex = signal(true);
  public hasFavoriteStocksSignal = computed(() => {
    return (
      Array.isArray(this.favoriteStocksData) &&
      this.favoriteStocksData.length > 0
    );
  });

  public navigateToHome(): void {
    this.router.navigate(['/']);
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

    const exchangeDataItem = this.favoriteStocksData?.find(
      e => e.code === stockCode
    );
    return (exchangeDataItem?.price ?? 0) * ownedStockAmount;
  }

  public canBuyOrSellStock(stockCode: string): boolean {
    return !!this.favoriteStocksData?.find(
      exchangeData => exchangeData.code === stockCode
    )?.price;
  }

  private dispatchStockBuyAction(stockCode: string, amount: number): void {
    const exchangeDataBought = new ExchangeDataOwned(stockCode, amount);
    this.store.dispatch(buyStock({exchangeDataBought: exchangeDataBought}));
  }

  private dispatchStockSellAction(stockCode: string, amount: number): void {
    const exchangeDataBought = new ExchangeDataOwned(stockCode, amount);
    this.store.dispatch(sellStock({exchangeDataSold: exchangeDataBought}));
  }

  private dispatchLoadFavoriteStocksAction(data: ExchangeDataBase[]): void {
    this.store.dispatch(loadFavoriteStocksData({favoriteStocksData: data}));
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
    return this.favoriteStocksData?.some(e => e.code === stockCode) ?? false;
  }

  ngOnDestroy(): void {
    this.exchangePricesService.stop();
  }
}
