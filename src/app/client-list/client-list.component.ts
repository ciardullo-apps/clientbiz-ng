import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service'
import { Client } from '../model/client'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  selectedClient: Client;
  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
  }
}
