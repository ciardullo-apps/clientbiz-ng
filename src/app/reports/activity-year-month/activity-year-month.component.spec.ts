import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { activityYearMonthTestData } from 'src/app/test/mock-data/activity-year-month-test-data';
import { ReportService } from '../report.service';

import { ActivityYearMonthComponent } from './activity-year-month.component';

describe('ActivityYearMonthComponent', () => {
  let component: ActivityYearMonthComponent;
  let fixture: ComponentFixture<ActivityYearMonthComponent>;
  let reportService: ReportService

  let year = 2021
  let month = 5

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityYearMonthComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule
      ],
      providers: [
        ReportService,
        { 
          provide: ActivatedRoute, 
          useValue: { 
            snapshot: { 
              paramMap: { 
                get: (key: string) => {
                  switch (key) {
                    case 'year':
                      return year
                    case 'month':
                      return month
                  }
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityYearMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    reportService = TestBed.inject(ReportService)
    spyOn(reportService, 'getActivityByYearMonth').and.returnValue(of(activityYearMonthTestData))

    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of contents from service', () => {
    expect(reportService.getActivityByYearMonth).toHaveBeenCalledOnceWith(year, month);
    expect(component.contents.length).toBe(3);
  });
});
