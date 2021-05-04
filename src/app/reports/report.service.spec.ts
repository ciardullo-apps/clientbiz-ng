import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { monthlyActivityTestData } from '../test/mock-data/monthly-activity-test-data';

import { ReportService } from './report.service';

describe('ReportService', () => {
  // let service: ReportService;
  let authServiceSpy : any;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(ReportService);
  // });

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['buildHeaders']);

    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    })
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  it('should be created', () => {
    const service: ReportService = TestBed.get(ReportService);
    expect(service).toBeTruthy();
  });

  it('should retrieve monthly activity from http get to backend',
  inject([HttpTestingController, ReportService],
    (httpMock: HttpTestingController, service: ReportService) => {
      // Call the service
      service.getMonthlyActivity().subscribe(data => {
        expect(data.length).toBe(2);
        expect(data[0].monthOfYear).toBe("2017-10");
        expect(data[1].monthOfYear).toBe("2017-09");
      });

      // Set expectations for the HttpClient mock
      const req = httpMock.expectOne(`${environment.apiAddress}/monthly-activity`);
      expect(req.request.method).toEqual('GET');

      // Then set the fake data returned by the mock
      req.flush(monthlyActivityTestData);
    }
  ));
});
