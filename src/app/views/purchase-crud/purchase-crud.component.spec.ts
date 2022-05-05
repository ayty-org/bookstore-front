import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCrudComponent } from './purchase-crud.component';

describe('PurchaseCrudComponent', () => {
  let component: PurchaseCrudComponent;
  let fixture: ComponentFixture<PurchaseCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
