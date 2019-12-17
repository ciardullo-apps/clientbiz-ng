import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesComponent } from './receivables.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { MockClientService } from '../test/mock-service/mock.client.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { receivableTestData } from '../test/mock-data/receivable-test-data';

describe('ReceivablesComponent', () => {
  let component: ReceivablesComponent;
  let fixture: ComponentFixture<ReceivablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivablesComponent ],
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

});
