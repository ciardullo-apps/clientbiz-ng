import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientDetailComponent } from './client-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';
import { clientTestData } from '../test/mock-data/client-test-data';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { topicTestData } from '../test/mock-data/topics-test-data';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;
  let clientService: ClientService;
  let toastrService : ToastrService;
  let clientId = 101;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        MatSelectModule,
        MatOptionModule,
        MatCheckboxModule,
        ToastrModule.forRoot({
          positionClass: 'toast-top-right'
        }),
      ],
      providers: [
        ClientService,
        ToastrService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get() { return clientId; } } } } }
      ]
    })
    .compileComponents();
  })
  
  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailComponent)
    component = fixture.componentInstance

    clientService = TestBed.inject(ClientService)
    toastrService = TestBed.inject(ToastrService)

    spyOn(clientService, 'getClient').and.returnValue( of(clientTestData.find(client => client.id === clientId)));
    spyOn(clientService, 'saveClient').and.returnValue(of({ updatedClientId: clientId }));
    spyOn(clientService, 'getTopics').and.returnValue(of(topicTestData));
    spyOn(clientService, 'getSelectedTopics').and.returnValue(of(topicTestData.filter(x => clientTestData.find(client => client.id === clientId).assigned_topics.indexOf(x.id) !== -1)))

    spyOn(toastrService, 'success')
    spyOn(toastrService, 'error')

    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its client data from service', () => {
    expect(clientService.getClient).toHaveBeenCalled();
    expect(component.client.id).toBe(101);
    expect(component.client.firstname).toBe('Jane');
    expect(component.client.lastname).toBe('Doe');
    expect(component.client.numappts).toBe(1);
    expect(component.client.revenue).toBe(10.0);

    expect(clientService.getSelectedTopics).toHaveBeenCalled();
    expect(component.client.assigned_topics.length).toBe(2);

    expect(clientService.getTopics).toHaveBeenCalled();
    expect(component.topics).toEqual(topicTestData);
  });

  it('should correctly reset firstcontact when solicited checkbox is clicked', fakeAsync(() => {
    const originalFirstContact = component.client.firstcontact;
    const spy = spyOn(component, "toggleFirstContact").and.callThrough();

    // TODO Why does nativeElement.querySelector(':checked') return null?
    const solicited = fixture.debugElement.nativeElement.querySelector('#solicited');

    expect(component.client.firstcontact).toEqual(originalFirstContact);

    solicited.click();
    fixture.detectChanges()
    tick()
    expect(component.client.firstcontact).toBeNull();

    solicited.click();
    fixture.detectChanges()
    tick()
    expect(component.client.firstcontact).toEqual(originalFirstContact);

    solicited.click();
    fixture.detectChanges()
    tick()
    expect(component.client.firstcontact).toBeNull();

    solicited.click();
    fixture.detectChanges()
    tick()
    expect(component.client.firstcontact).toEqual(originalFirstContact);

    // TODO Investigate why an odd number of clicks results in this test sometimes passes, sometimes fails
    expect(component.toggleFirstContact).toHaveBeenCalledTimes(4);
  }))

  it('should correctly disable firstcontact when solicited checkbox is clicked', fakeAsync(() => {
    const solicited = fixture.debugElement.nativeElement.querySelector('#solicited');
    let firstcontact = fixture.debugElement.nativeElement.querySelector('#firstcontact');

    expect(component.client.solicited).toBeTrue()
    expect(firstcontact.disabled).toBeFalse()

    solicited.click()
    fixture.detectChanges();
    tick()
    expect(component.client.solicited).toBeFalse()
    fixture.detectChanges();
    expect(firstcontact.disabled).toBeTrue()

    solicited.click();
    fixture.detectChanges();
    tick()
    expect(component.client.solicited).toBeTrue()
    fixture.detectChanges();
    expect(firstcontact.disabled).toBeFalse()

    solicited.click();
    fixture.detectChanges();
    tick()
    expect(component.client.solicited).toBeFalse()
    fixture.detectChanges();
    expect(firstcontact.disabled).toBeTrue()

    solicited.click();
    fixture.detectChanges();
    tick()
    expect(component.client.solicited).toBeTrue()
    fixture.detectChanges();
    expect(firstcontact.disabled).toBeFalse()
  }))

  it('should call saveClient if there are no validation errors', () => {
    spyOn(component, "saveClient").and.callThrough();

    const submit = fixture.debugElement.nativeElement.querySelector('#submit');
    submit.click();

    expect(component.saveClient).toHaveBeenCalled();
    expect(clientService.saveClient).toHaveBeenCalled();
    expect(toastrService.success).toHaveBeenCalledWith(`Client id ${clientId} saved`);
  });

});
