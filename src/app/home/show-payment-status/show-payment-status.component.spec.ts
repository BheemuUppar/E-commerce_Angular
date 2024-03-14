import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaymentStatusComponent } from './show-payment-status.component';

describe('ShowPaymentStatusComponent', () => {
  let component: ShowPaymentStatusComponent;
  let fixture: ComponentFixture<ShowPaymentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowPaymentStatusComponent]
    });
    fixture = TestBed.createComponent(ShowPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
