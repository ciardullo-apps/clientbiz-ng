import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesComponent } from './receivables.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { receivableTestData } from '../test/mock-data/receivable-test-data';
import { of } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ReceivablesComponent', () => {
  let component: ReceivablesComponent;
  let fixture: ComponentFixture<ReceivablesComponent>;
  let clientService: ClientService;
  let toastrService: ToastrService;
  const appointmentId = 1072;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivablesComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatNativeDateModule,
        MatDatepickerModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        }),
      ],
      providers: [
        ClientService, ToastrService
      ]
    })
    .compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivablesComponent)
    component = fixture.componentInstance
    clientService = TestBed.inject(ClientService)
    toastrService = TestBed.inject(ToastrService)

    spyOn(clientService, 'getReceivables').and.returnValue(of(receivableTestData));
    spyOn(clientService, 'markPaid').and.returnValue(of({ updatedAppointmentId: appointmentId }));

    spyOn(toastrService, 'success')
    spyOn(toastrService, 'error')

    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of receivables from service', () => {
    expect(clientService.getReceivables).toHaveBeenCalled();
    expect(component.receivables.length).toBe(4);
    expect(component.getTotalOutstanding()).toBe(62.50);
  });

  it('should initialize its paidDate to today', () => {
    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
    expect(component.paidDatePicker.value).toEqual(todayAtMidnight);
  });

  it('should render total outstanding as currency', () => {
    expect(fixture.nativeElement.querySelector('#totalOutstanding').innerHTML).toBe('$62.50');
  });

  it('should render total appointment start times in correct timezone', () => {
    expect(component.receivables).toEqual(receivableTestData);
    // Array index 0 is the header row, 5 is the footer. length is 6
    let tableRows = fixture.debugElement.queryAll(By.css('.mat-column-starttime'));
    expect(tableRows[1].nativeElement.innerHTML).toBe('12/12/19, 7:00 PM');
    expect(tableRows[2].nativeElement.innerHTML).toBe('12/15/19, 4:00 PM');
    expect(tableRows[3].nativeElement.innerHTML).toBe('12/15/19, 7:00 PM');
    expect(tableRows[4].nativeElement.innerHTML).toBe('12/15/19, 8:00 PM');
  });

  it('should render total appointment amounts due as currency', () => {
    expect(component.receivables).toEqual(receivableTestData);
    // Array index 0 is the header row, 5 is the footer. length is 6
    let tableRows = fixture.debugElement.queryAll(By.css('.mat-column-amountdue'));
    expect(tableRows[1].nativeElement.innerHTML).toBe('$13.75');
    expect(tableRows[2].nativeElement.innerHTML).toBe('$18.75');
    expect(tableRows[3].nativeElement.innerHTML).toBe('$15.00');
    expect(tableRows[4].nativeElement.innerHTML).toBe('$15.00');
  });

  it('should invoke markPaid with the correct appointment id and date when the link is clicked', () => {
    spyOn(component, "onMarkPaid").and.callThrough();
    const link = fixture.debugElement.nativeElement.querySelector('#markpaid_' + appointmentId);
    const paidDate = component.paidDatePicker.value.toISOString().slice(0, 10);
    link.click();
    // fixture.whenStable().then(() => {
    expect(component.onMarkPaid).toHaveBeenCalledWith(appointmentId);
    expect(clientService.markPaid).toHaveBeenCalledWith(appointmentId, paidDate);
    expect(toastrService.success).toHaveBeenCalledWith(`Appointment ID ${appointmentId} marked paid on ${paidDate}`);
    // });
  });

});
