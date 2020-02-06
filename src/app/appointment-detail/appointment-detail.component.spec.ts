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

describe('AppointmentDetailComponent', () => {
  let component: AppointmentDetailComponent;
  let fixture: ComponentFixture<AppointmentDetailComponent>;
  let clientServiceSpy: any;

  beforeEach(async(() => {
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
});
