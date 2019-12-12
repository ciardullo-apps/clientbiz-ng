import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from '../services/client.service';
import { MockClientService } from '../test/mock-service/mock.client.service';
import { By } from '@angular/platform-browser';

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

  it('should initialize its list of clients from service', () => {
    expect(component.clients.length).toBe(2);
    expect(component.getTotalAppts()).toBe(3);
    expect(component.getTotalRevenue()).toBe(30.0);
  });

  it('should correctly sum total appointments', () => {
    expect(component.getTotalAppts()).toBe(3);
    expect(fixture.nativeElement.querySelector('#totalAppts').innerHTML).toBe('3');
  });

  it('should correctly sum total revenue', () => {
    expect(component.getTotalRevenue()).toBe(30.0);
    expect(fixture.nativeElement.querySelector('#totalRevenue').innerHTML).toBe('$30.00');
  });
});
