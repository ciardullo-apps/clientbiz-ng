import { Component, OnInit } from '@angular/core';
import { Receivable } from '../model/receivable';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css']
})
export class ReceivablesComponent implements OnInit {

  receivables: Receivable[];

  constructor(private clientService: ClientService ) { }

  ngOnInit() {
    this.getReceivables();
  }

  getReceivables() : void {
    this.clientService.getReceivables()
      .subscribe(receivables => {
        this.receivables = receivables;
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
