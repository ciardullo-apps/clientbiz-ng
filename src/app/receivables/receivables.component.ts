import { Component, OnInit } from '@angular/core';
import { Receivable } from '../model/receivable';
import { ClientService } from '../services/client.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css']
})
export class ReceivablesComponent implements OnInit {

  receivables: Receivable[];
  displayedColumns = ['appointment_id', 'firstname', 'lastname', 'topicname', 'starttime', 'duration', 'rate', 'billingpct', 'amountdue', 'paid'];
  dataSource;


  constructor(private clientService: ClientService ) { }

  ngOnInit() {
    this.getReceivables();
  }

  getReceivables() : void {
    this.clientService.getReceivables()
      .subscribe(receivables => {
        this.receivables = receivables;
        this.dataSource = new MatTableDataSource<Receivable>(receivables);
      })
  }

  getTotalOutstanding() : number {
    let totalOutstanding = 0.0;
    if(this.receivables) {
      totalOutstanding = this.receivables.map(r => (r.rate * (r.duration / 60) * r.billingpct))
        .reduce((acc, value) => acc + value, 0);
    }

    return totalOutstanding;
  }

}
