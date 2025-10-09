import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositCash } from './deposit-cash';

describe('DepositCash', () => {
  let component: DepositCash;
  let fixture: ComponentFixture<DepositCash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepositCash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepositCash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
