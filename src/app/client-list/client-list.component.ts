import { Component, OnInit } from '@angular/core';

import { clients } from '../data/clients';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients = clients;

  constructor() { }

  ngOnInit() {
  }

}
