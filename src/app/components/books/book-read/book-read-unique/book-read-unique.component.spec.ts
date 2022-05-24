import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReadUniqueComponent } from './book-read-unique.component';

describe('BookReadUniqueComponent', () => {
  let component: BookReadUniqueComponent;
  let fixture: ComponentFixture<BookReadUniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReadUniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReadUniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
