import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ClientService } from '../services/client.service'
import { Client } from '../model/client'

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients: Client[];
  displayedColumns = ['id', 'firstname', 'lastname', 'contactname', 'timezone', 'solicited', 'numappts', 'revenue', 'lastapptdate'];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
        this.dataSource = new MatTableDataSource<Client>(clients);
        this.dataSource.sort = this.sort;
      });
  }

  getTotalAppts() {
    let totalAppts = 0;
    if(this.clients) {
     totalAppts = this.clients.map(t => t.numappts).reduce((acc, value) => acc + value, 0);
    }
    return totalAppts;
  }

  getTotalRevenue() {
    let totalRevenue = 0.0;
    if(this.clients) {
     totalRevenue = this.clients.map(t => t.revenue).reduce((acc, value) => acc + value, 0);
    }
    return totalRevenue;
  }
}
