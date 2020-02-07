import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailComponent } from './appointment-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { clientTestData } from '../test/mock-data/client-test-data';
import { idValueTestData } from '../test/mock-data/id-value-test-data';

describe('AppointmentDetailComponent', () => {
  let component: AppointmentDetailComponent;
  let fixture: ComponentFixture<AppointmentDetailComponent>;
  let clientServiceSpy: any;

  beforeEach(async(() => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['getClients', 'getTopics']);
    clientServiceSpy.getClients.and.returnValue( of(clientTestData));
    clientServiceSpy.getTopics.and.returnValue( of(idValueTestData));

    TestBed.configureTestingModule({
      declarations: [ AppointmentDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its client data from service', () => {
    expect(clientServiceSpy.getClients).toHaveBeenCalled();
    expect(component.clients[0].clientId).toBe(101);
    expect(component.clients[0].firstname).toBe('Jane');
    expect(component.clients[0].lastname).toBe('Doe');
    expect(component.clients[0].numappts).toBe(1);
    expect(component.clients[0].revenue).toBe(10.0);
  });

  it('should initialize its topic list from service', () => {
    expect(clientServiceSpy.getTopics).toHaveBeenCalled();
    expect(component.topics[0]).toEqual({1: 'foo'});
    expect(component.topics[3]).toEqual({4: 'qux'});
    expect(component.topics.length).toBe(4);
  });

});
