import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClientDetailComponent } from './client-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { clientTestData } from '../test/mock-data/client-test-data';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;
  let clientService : ClientService;
  let clientId = 102;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
      ],
      providers: [
        ClientService,
        { provide: ActivatedRoute,  useValue: { snapshot: { paramMap: { get() { return clientId; } } } } }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    clientService = TestBed.get(ClientService);
    spyOn(clientService, 'getClient').and.returnValue(
      of(clientTestData.find(client => client.clientId === clientId)));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its client data from service', () => {
    expect(component.client.clientId).toBe(102);
    expect(component.client.firstname).toBe('Anne');
    expect(component.client.lastname).toBe('Roe');
    expect(component.client.numappts).toBe(2);
    expect(component.client.revenue).toBe(20.0);
  });
});
