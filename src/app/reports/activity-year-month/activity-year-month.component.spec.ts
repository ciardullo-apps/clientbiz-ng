import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
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

  it('should correctly populate the report column headings with headers defined in the component', () => {
    const headerRowNum = 0
    component.columnHeaders.forEach((columnHeader, index) => {
      let columnHeading: DebugElement[] = fixture.debugElement.queryAll(By.css(`.mat-column-${component.displayedColumns[index]}`))
      expect(columnHeading[headerRowNum].nativeElement.innerHTML).toBe(columnHeader)
    });
  })

  it('should correctly populate the ALL displayed columns with contents from Report service', () => {
    // Iterate each row of test data
    for(let rowNum = 0; rowNum < component.contents.length; rowNum++) {
      // Iterate each column on the report by name
      component.displayedColumns.forEach(columnName => {
        // Get one row at a time from the table in the DOM
        let cell: DebugElement[] = fixture.debugElement.queryAll(By.css(`.mat-column-${columnName}`))
        // x + 1 below skips the header row
        if(columnName === 'starttime') {
          // Ensure date/time is formatted properly
          expect(cell[rowNum + 1].nativeElement.innerText).toContain(component.contents[rowNum][columnName].toLocaleString('en-US', {hour: '2-digit', minute:'2-digit'}))
        } else if(columnName === 'revenue') {
          // Ensure accuracy of revenue calculation
          const revenue = component.contents[rowNum]['rate'] * (component.contents[rowNum]['duration'] / 60) * component.contents[rowNum]['billingpct']
          expect(cell[rowNum + 1].nativeElement.innerText).toBe(revenue.toLocaleString('en-US', {style: 'currency', currency: 'USD'}))
        } else if(columnName === 'paid') {
          // Paid may be null, ensure nulls are rendered as an empty DOM element
          if(component.contents[rowNum][columnName]) {
            expect(cell[rowNum + 1].nativeElement.innerText).toContain(component.contents[rowNum][columnName].toString())
          } else {
            expect(cell[rowNum + 1].nativeElement.innerText).toBe('')
          }
        } else {
          expect(cell[rowNum + 1].nativeElement.innerText).toContain(component.contents[rowNum][columnName].toString())
        }
      });
    }
  })
});
