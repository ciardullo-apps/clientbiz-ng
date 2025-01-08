import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../model/client';
import { Topic } from '../model/topic';
import { ClientService, UpdateClientResponse } from '../services/client.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client: Client;
  originalFirstContact: Date;
  topics: Topic[];
  clientForm: FormGroup = new FormGroup ({
    id: new FormControl({disabled: true}),
    firstname: new FormControl(),
    lastname: new FormControl(),
    assigned_topics: new FormControl(),
    contactname: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    timezone: new FormControl(),
    solicited: new FormControl(),
    firstcontact: new FormControl({disabled: true}),
    firstresponse: new FormControl(),
  })

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getClient();
    this.getTopics();
  }

  getClient(): void {
    // Javascript plus sign converts string to number
    const id = +this.route.snapshot.paramMap.get('id');
    if(id > 0) {
      this.clientService.getClient(id)
        .subscribe(client => {
          this.client = client;
          if(!this.client.firstcontact) {
            this.originalFirstContact = null // this.nextHourDate();
          } else {
            this.originalFirstContact = this.client.firstcontact;
          }
          this.clientService.getSelectedTopics(id)
            .subscribe(clientTopics => {
              this.client.assigned_topics = clientTopics.map(a => a['id']);
              this.clientForm.patchValue(this.client) // patchValue() ignores properties in Client that are not in FormGroup
              this.clientForm.get('id').disable()
            })
        });
    } else {
      this.client = {
        id: 0,
        firstname: '',
        lastname: '',
        assigned_topics: [],
        contactname: '',
        city: '',
        state: '',
        firstcontact: this.nextHourDate(),
        firstresponse: this.nextHourDate(),
        timezone: '',
        solicited: true
      }
      this.originalFirstContact = this.client.firstcontact;
      console.log(this.originalFirstContact)
      this.clientForm.patchValue(this.client)
      this.clientForm.get('firstcontact').setValue(this.getTimezoneAdjustedISOString(this.client.firstcontact))
      this.clientForm.get('firstresponse').setValue(this.getTimezoneAdjustedISOString(this.client.firstresponse))
      this.clientForm.get('id').disable()
      // this.client = new Client();
      // this.client.id = -1
      // this.client.solicited = true;
      // this.client.firstcontact = this.nextHourDate();
      // this.originalFirstContact = this.client.firstcontact;
      // this.client.firstresponse = this.client.firstcontact;
    }
  }

  toggleFirstContact() : void {
    if (this.client.firstcontact) {
      this.client.firstcontact = null;
      this.client.solicited = false
      this.clientForm.get('firstcontact').disable()
    } else {
      this.client.firstcontact = this.originalFirstContact;
      this.client.solicited = true
      this.clientForm.get('firstcontact').enable()
    }
  }

  saveClient() : void {
    this.clientForm.get('id').enable()
    this.client = this.clientForm.value
    this.clientForm.get('id').disable()

    if(this.client.id) {
      console.log('Saving client 1', this.client.id);
    } else {
      delete this.client.id
      console.log('Adding client', this.client.firstname, this.client.lastname, this.client.assigned_topics);
    }

    this.clientService.saveClient(this.client)
      .subscribe(
        (response: UpdateClientResponse) => {
          this.client.id = response.updatedClientId;
          this.clientForm.patchValue(this.client)
          console.log(`Client id ${response.updatedClientId} saved`);
          this.toastr.success(`Client id ${response.updatedClientId} saved`);
        },
        (error: any) => {
          console.log(error);
          this.toastr.error(error);
        });
  }

  nextHourDate() : Date {
    // Advance to next hour
    var nextHour = new Date();
    nextHour.setMinutes(0);
    nextHour.setHours(nextHour.getHours() + 1);
    return nextHour;
  }

  getTopics(): void {
    this.clientService.getTopics()
      .subscribe(topics => {
        this.topics = topics;
      });
  }

  getTimezoneAdjustedISOString(d: Date): string {
    const tzoffset = d.getTimezoneOffset() * 60000
    // toISOString returns date in UTC, need to adjust by tzoffset prior to calling toISOString
    return (new Date(d.getTime() - tzoffset)).toISOString().replace('T', ' ').substring(0,16)
  }
}
