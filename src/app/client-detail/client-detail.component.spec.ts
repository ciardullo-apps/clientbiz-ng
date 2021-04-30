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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { topicTestData } from '../test/mock-data/topics-test-data';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;
  let clientId = 101;
  let clientServiceSpy: any;
  let toastrServiceSpy : any;

  beforeEach(async(() => {
    clientServiceSpy = jasmine.createSpyObj('ClientService', ['getClient', 'saveClient', 'getTopics', 'getSelectedTopics']);
    clientServiceSpy.getClient.and.returnValue( of(clientTestData.find(client => client.id === clientId)));
    clientServiceSpy.saveClient.and.returnValue(of({ updatedClientId: clientId }));
    clientServiceSpy.getTopics.and.returnValue(of(topicTestData));
    clientServiceSpy.getSelectedTopics.and.returnValue(of(topicTestData.filter(x => clientTestData.find(client => client.id === clientId).assigned_topics.indexOf(x.id) !== -1)))
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    TestBed.configureTestingModule({
      declarations: [ ClientDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule,
        MatSelectModule,
        MatOptionModule
      ],
      providers: [
        { provide: ClientService, useValue: clientServiceSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get() { return clientId; } } } } }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize its client data from service', () => {
    expect(clientServiceSpy.getClient).toHaveBeenCalled();
    expect(component.client.id).toBe(101);
    expect(component.client.firstname).toBe('Jane');
    expect(component.client.lastname).toBe('Doe');
    expect(component.client.numappts).toBe(1);
    expect(component.client.revenue).toBe(10.0);

    expect(clientServiceSpy.getSelectedTopics).toHaveBeenCalled();
    expect(component.client.assigned_topics.length).toBe(2);

    expect(clientServiceSpy.getTopics).toHaveBeenCalled();
    expect(component.topics).toEqual(topicTestData);
  });

  /*
  TODO Investigate why an odd number of clicks() in these next two tests
  result in subsequent failures. Seems like something is "remembered"
  when ng test runs more than once. An even number of clicks() fixes this problem
  */
  it('should correctly reset firstcontact when solicited checkbox is clicked', () => {
    const originalFirstContact = component.client.firstcontact;
    const spy = spyOn(component, "toggleFirstContact").and.callThrough();

    // TODO Why does nativeElement.querySelector(':checked') return null?
    const solicited = fixture.debugElement.nativeElement.querySelector('#solicited');

    expect(component.client.firstcontact).toEqual(originalFirstContact);

    solicited.click();
    expect(component.client.firstcontact).toBeNull();

    solicited.click();
    expect(component.client.firstcontact).toEqual(originalFirstContact);

    solicited.click();
    expect(component.client.firstcontact).toBeNull();

    solicited.click();
    expect(component.client.firstcontact).toEqual(originalFirstContact);

    expect(component.toggleFirstContact).toHaveBeenCalledTimes(4);
  });

  it('should correctly disable firstcontact when solicited checkbox is clicked', () => {
    const solicited = fixture.debugElement.nativeElement.querySelector('#solicited');
    const firstcontact = fixture.debugElement.nativeElement.querySelector('#firstcontact');

    expect(firstcontact.disabled).toBeFalse();

    solicited.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(firstcontact.disabled).toBeTrue();
      solicited.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(firstcontact.disabled).toBeFalse();
        solicited.click();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(firstcontact.disabled).toBeTrue();
          solicited.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(firstcontact.disabled).toBeFalse();
          });
        });
      });
    });
  });

  it('should call saveClient if there are no validation errors', () => {
    spyOn(component, "saveClient").and.callThrough();

    const submit = fixture.debugElement.nativeElement.querySelector('#submit');
    submit.click();

    expect(component.saveClient).toHaveBeenCalled();
    expect(clientServiceSpy.saveClient).toHaveBeenCalled();
    expect(toastrServiceSpy.success).toHaveBeenCalledWith(`Client id ${clientId} saved`);
  });

});
