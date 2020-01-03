import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../model/client';
import { ClientService } from '../services/client.service'

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
  client: Client;
  originalFirstContact: Date;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getClient();
  }

  getClient(): void {
    // Javascript plus sign converts string to number
    const id = +this.route.snapshot.paramMap.get('id');
    if(id > 0) {
      this.clientService.getClient(id)
        .subscribe(client => {
          this.client = client;
          if(!this.client.firstcontact) {
            this.originalFirstContact = this.nextHourDate();
          } else {
            this.originalFirstContact = this.client.firstcontact;
          }
        });
    } else {
      this.client = new Client();
      this.client.solicited = true;
      this.client.firstcontact = this.nextHourDate();
      this.originalFirstContact = this.client.firstcontact;
      this.client.firstresponse = this.client.firstcontact;
    }

  }

  toggleFirstContact() : void {
    if (this.client.firstcontact) {
      this.client.firstcontact = null;
    } else {
      this.client.firstcontact = this.originalFirstContact;
    }
  }

  saveClient() : void {
    if(this.client.id) {
      console.log('Saving client', this.client.id);
    } else {
      console.log('Adding client', this.client.firstname, this.client.lastname);
    }

    this.clientService.saveClient(this.client)
      .subscribe(UpdateClientResponse => {
        console.log(`Client id ${this.client.id} saved`);
      });
  }

  nextHourDate() : Date {
    // Advance to next hour
    var date = new Date();
    var nextHour = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    nextHour.setMinutes(0);
    nextHour.setHours(nextHour.getHours() + 1);
    return nextHour;
  }
}
