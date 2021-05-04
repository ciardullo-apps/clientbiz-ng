import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { monthlyActivityTestData } from 'src/app/test/mock-data/monthly-activity-test-data';
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

});
