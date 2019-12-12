import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { of } from 'rxjs';
import { clientTestData } from '../model/test-data/client-test-data';
import { RouterTestingModule } from '@angular/router/testing';

class MockClientService extends ClientService {
  public getClients() {
    return of(clientTestData);
  }
}

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListComponent ],
      imports: [
        RouterTestingModule,
        MatTableModule,
        HttpClientTestingModule,
      ],
      providers: [
        {provide: ClientService, useClass: MockClientService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of clients from service',
    inject([ClientService],
      () => {
        expect(component.clients.length).toBe(2);
        expect(component.getTotalAppts()).toBe(3);
        expect(component.getTotalRevenue()).toBe(30.0);
      })
  );

  it('should correctly sum total appointments',
    inject([ClientService],
      () => {
        expect(component.getTotalAppts()).toBe(3);
      })
  );

  it('should correctly sum total revenue',
    inject([ClientService],
      () => {
        expect(component.getTotalRevenue()).toBe(30.0);
      })
  );
});
