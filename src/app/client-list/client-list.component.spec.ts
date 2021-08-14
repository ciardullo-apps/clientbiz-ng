import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponent } from './client-list.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientService } from '../services/client.service';
import { clientTestData } from '../test/mock-data/client-test-data';
import { of } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('ClientListComponent', () => {
  let component: ClientListComponent;
  let fixture: ComponentFixture<ClientListComponent>;
  let clientService: ClientService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ ClientListComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatTableModule,
        MatCheckboxModule
      ],
      providers: [
        ClientService
      ]
    })
    .compileComponents();
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponent)
    component = fixture.componentInstance
    clientService = TestBed.inject(ClientService)
    
    spyOn(clientService, 'getClients').and.returnValue(of(clientTestData))

    component.ngOnInit()
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its list of clients from service', () => {
    expect(clientService.getClients).toHaveBeenCalled();
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

  it('should correctly sum total hours', () => {
    expect(component.getTotalHours()).toBe(23.0);
    expect(fixture.nativeElement.querySelector('#totalHours').innerHTML).toBe('23.00');
  });
});
