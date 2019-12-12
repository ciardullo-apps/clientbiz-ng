import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ClientService } from './client.service';
import { environment } from 'src/environments/environment';
import { clientTestData } from '../model/test-data/client-test-data';
import { appointmentTestData } from '../model/test-data/appointment-test-data';

describe('ClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule,
      ],
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    const service: ClientService = TestBed.get(ClientService);
    expect(service).toBeTruthy();
  });

  it('should retrieve list of clients from http get to backend',
    inject([HttpTestingController, ClientService],
      (httpMock: HttpTestingController, service: ClientService) => {
        // Call the service
        service.getClients().subscribe(data => {
          expect(data.length).toBe(2);
          expect(data[0].clientId).toBe(101);
          expect(data[1].clientId).toBe(102);
        });

        // Set expectations for the HttpClient mock
        const req = httpMock.expectOne(`${environment.apiAddress}/client`);
        expect(req.request.method).toEqual('GET');

        // Then set the fake data returned by the mock
        req.flush(clientTestData);
      }
    ));

  it('should retrieve one client\'s detail from http get to backend',
    inject([HttpTestingController, ClientService],
      (httpMock: HttpTestingController, service: ClientService) => {
        // Call the service
        service.getClient(102).subscribe(client => {
          expect(client.clientId).toBe(102);
          expect(client.firstname = 'Jane');
        });

        // Set expectations for the HttpClient mock
        const req = httpMock.expectOne(`${environment.apiAddress}/client/${clientTestData[1].clientId}`);
        expect(req.request.method).toEqual('GET');

        // Then set the fake data returned by the mock
        req.flush(clientTestData[1]);
      }
    ));

  it('should retrieve one client\'s list of appointments from http get to backend',
    inject([HttpTestingController, ClientService],
      (httpMock: HttpTestingController, service: ClientService) => {
        let clientId = 101;
        // Call the service
        service.getAppointments(clientId).subscribe(data => {
          expect(data.length).toBe(2);
          expect(data.map(a => a.duration).reduce((sum, duration) => sum + duration)).toBe(150)
        });

        // Set expectations for the HttpClient mock
        const req = httpMock.expectOne(`${environment.apiAddress}/appointments/${clientId}`);
        expect(req.request.method).toEqual('GET');

        // Then set the fake data returned by the mock
        req.flush(appointmentTestData.filter(appointment => appointment.client_id === clientId));
      }
    ));
});
