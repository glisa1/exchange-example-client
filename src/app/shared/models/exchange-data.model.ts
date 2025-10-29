export class ExchangeData {
  public code: string;
  public name: string;
  public price?: number;

  constructor(code: string, name: string, price?: number) {
    this.code = code;
    this.name = name;
    this.price = price;
  }

  public static fromObject(obj: any): ExchangeData {
    return new ExchangeData(obj.code, obj.name, obj.price);
  }
}

export class ExchangeDataOwned {
  public code: string;
  public amount: number;

  constructor(code: string, amount: number) {
    this.code = code;
    this.amount = amount;
  }
}
