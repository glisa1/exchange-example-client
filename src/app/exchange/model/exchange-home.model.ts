import {DOLAR_TO_EURO_CONVERSION_RATE} from '../../shared/constants/exchange-data.constants';

export class ExchangeDataBase {
  public code: string;
  public name: string;
  public price?: number;
  public priceGrown?: boolean;

  constructor(
    code: string,
    name: string,
    price?: number,
    priceGrown?: boolean
  ) {
    this.code = code;
    this.name = name;
    this.price = price;
    this.priceGrown = priceGrown;
  }

  public static fromObject(obj: any): ExchangeDataBase {
    return new ExchangeDataBase(obj.code, obj.name, obj.price, obj.priceGrown);
  }
}

export class ExchangeDataEuro extends ExchangeDataBase {
  public priceEuro?: number;

  public static override fromObject(obj: any): ExchangeDataEuro {
    return new ExchangeDataEuro(
      obj.code,
      obj.name,
      obj.price,
      obj.priceGrown,
      obj.priceEuro
    );
  }

  public static fromExchangeDataBase(data: ExchangeDataBase): ExchangeDataEuro {
    return new ExchangeDataEuro(
      data.code,
      data.name,
      data.price,
      data.priceGrown,
      data.price! * DOLAR_TO_EURO_CONVERSION_RATE
    );
  }

  constructor(
    code: string,
    name: string,
    price?: number,
    priceGrown?: boolean,
    priceEuro?: number
  ) {
    super(code, name, price, priceGrown);
    this.priceEuro = priceEuro;
  }
}
