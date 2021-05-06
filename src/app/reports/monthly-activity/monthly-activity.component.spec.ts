import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { monthlyActivityTestData } from 'src/app/test/mock-data/monthly-activity-test-data';
import { forEachChild } from 'typescript';
import { ReportService } from '../report.service';
import { MonthlyActivityComponent } from './monthly-activity.component';

describe('MonthlyActivityComponent', () => {
  let component: MonthlyActivityComponent;
  let fixture: ComponentFixture<MonthlyActivityComponent>;
  let reportService: ReportService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyActivityComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule
      ],
      providers: [
        ReportService
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyActivityComponent);
    component = fixture.componentInstance

    reportService = TestBed.inject(ReportService)
    spyOn(reportService, 'getMonthlyActivity').and.returnValue(of(monthlyActivityTestData));

    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of contents from service', () => {
    expect(reportService.getMonthlyActivity).toHaveBeenCalled();
    expect(component.contents.length).toBe(2);
  });

  it('should correctly populate the Total Clients column with contents from Report service', () => {
    let table: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-column-totalClients'))
    expect(table[0].nativeElement.innerHTML).toBe('Clients') // Header Row
    expect(table[1].nativeElement.innerHTML).toBe(component.contents[0].totalClients.toString()) // First row, total clients value
    expect(table[2].nativeElement.innerHTML).toBe(component.contents[1].totalClients.toString()) // Second row, total clients value
  })

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
        expect(cell[rowNum + 1].nativeElement.innerText).toContain(component.contents[rowNum][columnName].toString())
      });
    }
  })

  it('should correctly format the Month Year column anchor tag with the proper URL', () => {
    let table: DebugElement[] = fixture.debugElement.queryAll(By.css('.mat-column-monthOfYear'))
    expect(table[0].nativeElement.innerHTML).toBe('Month - Year') // Header Row

    // Assert the href path and the link text
    table.forEach((element: DebugElement, index: number) => {
      if(index != 0 && index != table.length - 1) {
        expect(element.properties.innerText).toBe(component.contents[index - 1].monthOfYear)
        let links = element.nativeElement.querySelector('a')
        const year = component.contents[index - 1].monthOfYear.substring(0,4)
        const month = component.contents[index - 1].monthOfYear.substring(5)
        expect(links.getAttribute('href')).toContain(`/reports/activity-year-month/${year}/${month}`)
      }
    })
  })

});
