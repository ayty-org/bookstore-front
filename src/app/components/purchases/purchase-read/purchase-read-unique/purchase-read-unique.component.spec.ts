import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReadUniqueComponent } from './purchase-read-unique.component';

describe('PurchaseReadUniqueComponent', () => {
  let component: PurchaseReadUniqueComponent;
  let fixture: ComponentFixture<PurchaseReadUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReadUniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReadUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
