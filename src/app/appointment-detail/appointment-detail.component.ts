import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../model/client';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  clients: Client[];
  topics: any[];

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.getClients();
    this.getTopics();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
      })
  }

  getTopics() : void {
    this.clientService.getTopics()
      .subscribe(topics => {
        // Map {id: 1, name: 'foo'} to { 1: 'foo' }
        this.topics = topics.map(t => {
          let obj = {};
          obj[t.id] = t.name;
          return obj;
        });
      });
  }

}
