export class ExchangeDataUser {
  constructor(
    public username: string,
    public email: string,
    public keycloakId: string,
    public balance: number = 0
  ) {}
}
