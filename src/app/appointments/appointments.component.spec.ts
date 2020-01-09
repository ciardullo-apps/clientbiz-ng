import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsComponent } from './appointments.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { appointmentTestData } from '../test/mock-data/appointment-test-data';

describe('AppointmentsComponent', () => {
  let component: AppointmentsComponent;
  let fixture: ComponentFixture<AppointmentsComponent>;
  let clientServiceSpy: any;
  let clientId = 101;

  beforeEach(async(() => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['getAppointments']);
    clientServiceSpy.getAppointments.and.returnValue(of(appointmentTestData.filter((appointment => appointment.client_id === clientId))));

    TestBed.configureTestingModule({
      declarations: [ AppointmentsComponent ],
      imports: [
        MatTableModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get() { return clientId; } } } } }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of appointments from service', () => {
    expect(clientServiceSpy.getAppointments).toHaveBeenCalled();
    expect(component.appointments.length).toBe(2);
    expect(component.clientId).toBe(clientId);
    expect(component.appointments.map(appointment => appointment.duration).reduce((sum, value) => sum + value)).toBe(150);
  });

});
