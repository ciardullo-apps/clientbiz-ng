import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentDetailComponent } from './appointment-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { of } from 'rxjs';
import { clientTestData } from '../test/mock-data/client-test-data';
import { appointmentTestData } from '../test/mock-data/appointment-test-data';
import { idValueTestData } from '../test/mock-data/id-value-test-data';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';

describe('AppointmentDetailComponent', () => {
  let component: AppointmentDetailComponent;
  let fixture: ComponentFixture<AppointmentDetailComponent>;
  let clientService: ClientService;
  let toastrService: ToastrService;

  // Randomizing the array index of appointmentTestData will use any and all test appointments
  let testDataIndex = Math.floor((Math.random() * appointmentTestData.length));

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        })
      ],
      providers: [
        ClientService, ToastrService
      ]
    })
    .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailComponent)
    component = fixture.componentInstance

    clientService = TestBed.inject(ClientService)
    toastrService = TestBed.inject(ToastrService)

    spyOn(clientService, 'getClients').and.returnValue(of(clientTestData));
    spyOn(clientService, 'getTopics').and.returnValue(of(idValueTestData));
    spyOn(clientService, 'saveAppointment').and.returnValue(of({appointmentId: appointmentTestData[testDataIndex].id}));

    spyOn(toastrService, 'success')
    spyOn(toastrService, 'error')

    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its client data from service', () => {
    expect(clientService.getClients).toHaveBeenCalled();
    expect(component.clients[0].id).toBe(101);
    expect(component.clients[0].firstname).toBe('Jane');
    expect(component.clients[0].lastname).toBe('Doe');
    expect(component.clients[0].numappts).toBe(1);
    expect(component.clients[0].revenue).toBe(10.0);
  });

  it('should call saveAppointment if there are no validation errors', () => {
    spyOn(component, "saveAppointment").and.callThrough();
    component.appointment = appointmentTestData[testDataIndex];
    const submit = fixture.debugElement.nativeElement.querySelector('#submit');
    submit.click();

    expect(component.saveAppointment).toHaveBeenCalled();
    expect(clientService.saveAppointment).toHaveBeenCalled();
    expect(component.appointment.id).toBe(appointmentTestData[testDataIndex].id);
    expect(toastrService.success).toHaveBeenCalledWith(`Appointment id ${component.appointment.id} saved`);
  });
});
