import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { monthlyActivityTestData } from 'src/app/test/mock-data/monthly-activity-test-data';
import { ReportService } from '../report.service';

import { MonthlyActivityComponent } from './monthly-activity.component';

describe('MonthlyActivityComponent', () => {
  let component: MonthlyActivityComponent;
  let fixture: ComponentFixture<MonthlyActivityComponent>;
  let reportServiceSpy : any;

  beforeEach(async () => {
    reportServiceSpy = jasmine.createSpyObj('ReportService', ['getMonthlyActivity']);
    reportServiceSpy.getMonthlyActivity.and.returnValue( of(monthlyActivityTestData));

    await TestBed.configureTestingModule({
      declarations: [ MonthlyActivityComponent ],
      imports: [
        RouterTestingModule,
        MatTableModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: ReportService, useValue: reportServiceSpy },
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of contents from service', () => {
    expect(reportServiceSpy.getMonthlyActivity).toHaveBeenCalled();
    expect(component.contents.length).toBe(2);
  });

});
