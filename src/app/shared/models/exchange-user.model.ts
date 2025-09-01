export class ExchangeUser {
  public firstName: string;
  public lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static emptyUser(): ExchangeUser {
    return new ExchangeUser('', '');
  }
}
