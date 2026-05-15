import { Component, OnInit, signal } from '@angular/core';
import { Receivable } from '../model/receivable';
import { ClientService, UpdatePaidDateResponse } from '../services/client.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BehaviorSubject, concatMap, forkJoin, of, switchMap } from 'rxjs';
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-receivables',
  templateUrl: './receivables.component.html',
  styleUrls: ['./receivables.component.css'],
  standalone: true,
  imports: [MatTableModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule, DatePipe, DecimalPipe, CurrencyPipe, MatAnchor],
  providers: [provideNativeDateAdapter()]
})
export class ReceivablesComponent implements OnInit {

  receivables: Receivable[] = []
  displayedColumns = ['appointment_id', 'firstname', 'lastname', 'topicname', 'starttime', 'duration', 'rate', 'billingpct', 'amountdue', 'paid'];
  dataSource: MatTableDataSource<Receivable>;
  paidDatePicker: FormControl;
  isToast = signal(false)
  submitMessage: string | null = null
  selected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  selectedTotal: number = 0

  constructor(private clientService: ClientService,
    private toastr: ToastrService) {
    const todayAtMidnight = new Date();
    todayAtMidnight.setHours(0, 0, 0, 0);
    this.paidDatePicker = new FormControl(todayAtMidnight);
  }

  ngOnInit() {
    this.getReceivables()
    this.selected.subscribe(value => {
      if (this.receivables.filter(r => r.paid).length > 0) {
        this.selectedTotal = this.receivables.filter(r => r.paid).map(r => r.rate * (r.duration / 60) * r.billingpct).reduce((sum, value) => sum + value)
      } else {
        this.selectedTotal = 0
      }
    })
  }

  getReceivables(): void {
    this.clientService.getReceivables()
      .subscribe(receivables => {
        this.receivables = receivables;
        this.dataSource = new MatTableDataSource<Receivable>(receivables);
      });
  }

  getTotalOutstanding(): number {
    let totalOutstanding = 0.0;
    if (this.receivables) {
      totalOutstanding = this.receivables.map(r => (r.rate * (r.duration / 60) * r.billingpct))
        .reduce((acc, value) => acc + value, 0);
    }

    return totalOutstanding;
  }

  togglePaid(appointmentId: number): void {
    const paidDate = this.paidDatePicker.value.toISOString().slice(0, 10);
    const receivable = this.receivables.find(r => r.appointment_id === appointmentId);
    if (receivable) {
      receivable.paid = receivable.paid ? null : paidDate;
    }
    this.selected.next(false)
  }

  onSubmit(): void {
    const paidReceivables = this.receivables.filter(r => r.paid);

    if (paidReceivables.length === 0) {
      // handle no items case if needed
      return;
    }

    const requestsMap = paidReceivables.map(r => ({
      receivable: r,
      request: this.clientService.markPaid(r.appointment_id, r.paid)
    }));

    forkJoin(requestsMap.map(item => item.request)).subscribe({
      next: (responses) => {
        responses.forEach((resp, i) => {
          const original = requestsMap[i].receivable;
          console.log(`Updated ${original.appointment_id}:`, resp);
        });

        this.submitMessage = responses.map(r => r.updatedAppointmentId).join(', ').concat(' IDs marked paid')
        this.isToast.update(isToast => !isToast);
      }
    });
  }

  selectAll(isChecked: any): void {
    const paidDate = this.paidDatePicker.value.toISOString().slice(0, 10)
    this.receivables.forEach(r => {
      r.paid = isChecked.checked ? paidDate : null
      this.selected.next(true)
    })
  }

}
