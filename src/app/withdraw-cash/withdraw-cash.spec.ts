import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawCash } from './withdraw-cash';

describe('WithdrawCash', () => {
  let component: WithdrawCash;
  let fixture: ComponentFixture<WithdrawCash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawCash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawCash);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
