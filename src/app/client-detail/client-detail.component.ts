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
  originalFirstContact: string;

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
            this.originalFirstContact = this.now();
          } else {
            this.originalFirstContact = this.client.firstcontact;
          }
        });
    } else {
      this.client = new Client();
      this.client.solicited = true;
      this.client.firstcontact = this.now();
      this.originalFirstContact = this.client.firstcontact;
    }

  }

  toggleFirstContact() : void {
    if (this.client.firstcontact) {
      this.client.firstcontact = null;
    } else {
      this.client.firstcontact = this.originalFirstContact;
    }
  }

  now() : string {
    let offset = new Date().getTimezoneOffset();
    let now = new Date();
    now.setMinutes(now.getMinutes() - offset);
    return now.toISOString().slice(0, 16);
  }
}
