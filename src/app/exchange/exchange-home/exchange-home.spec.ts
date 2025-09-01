import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeHome } from './exchange-home';

describe('ExchangeHome', () => {
  let component: ExchangeHome;
  let fixture: ComponentFixture<ExchangeHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
