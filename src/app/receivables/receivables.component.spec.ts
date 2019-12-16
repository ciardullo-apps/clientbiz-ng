import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesComponent } from './receivables.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { MockClientService } from '../test/mock-service/mock.client.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ReceivablesComponent', () => {
  let component: ReceivablesComponent;
  let fixture: ComponentFixture<ReceivablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivablesComponent ],
      imports: [
        RouterTestingModule,
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
    fixture = TestBed.createComponent(ReceivablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of receivables from service', () => {
    expect(component.receivables.length).toBe(4);
    expect(component.getTotalOutstanding()).toBe(62.50);
  });
});
