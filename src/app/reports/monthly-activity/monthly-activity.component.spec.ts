import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyActivityComponent } from './monthly-activity.component';

describe('MonthlyActivityComponent', () => {
  let component: MonthlyActivityComponent;
  let fixture: ComponentFixture<MonthlyActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyActivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
