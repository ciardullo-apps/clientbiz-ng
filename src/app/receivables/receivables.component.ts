import { Component, OnInit } from '@angular/core';
import { Receivable } from '../model/receivable';
import { ClientService, UpdatePaidDateResponse } from '../services/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css']
})
export class ReceivablesComponent implements OnInit {

  receivables: Receivable[];
  displayedColumns = ['appointment_id', 'firstname', 'lastname', 'topicname', 'starttime', 'duration', 'rate', 'billingpct', 'amountdue', 'paid'];
  dataSource: MatTableDataSource<Receivable>;
  paidDatePicker: FormControl;

  constructor(private clientService: ClientService ) {
    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
    this.paidDatePicker = new FormControl(todayAtMidnight);
  }

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

  onMarkPaid(appointmentId : number) : void {
    console.log(this.paidDatePicker.value);
    const paidDate = this.paidDatePicker.value.toISOString().slice(0, 10);
    console.log(paidDate);
    this.clientService.markPaid(appointmentId, paidDate)
      .subscribe((resp: UpdatePaidDateResponse) => {
        console.log(resp);
      });
  }

}
