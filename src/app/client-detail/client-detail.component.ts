import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  topicSelect = new FormControl();
  topics: Topic[];

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
            this.originalFirstContact = this.nextHourDate();
          } else {
            this.originalFirstContact = this.client.firstcontact;
          }
          this.clientService.getSelectedTopics(id)
            .subscribe(clientTopics => {
              this.client.assigned_topics = clientTopics;
          })
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
      console.log('Saving client 1', this.client.id);
    } else {
      console.log('Adding client', this.client.firstname, this.client.lastname, this.client.assigned_topics);
    }

    this.clientService.saveClient(this.client)
      .subscribe(
        (response: UpdateClientResponse) => {
          this.client.id = response.updatedClientId;
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

}
