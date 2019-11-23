import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from '../model/appointment';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../services/client.service';
import { MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {
  clientId: number;
  appointments: Appointment[];
  displayedColumns = ['id', 'topic_name', 'starttime', 'duration', 'rate', 'billingpct', 'paid'];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute
) { }

  ngOnInit() {
    this.getAppointments();
  }

  getAppointments(): void {
    this.clientId = +this.route.snapshot.paramMap.get('id');
    this.clientService.getAppointments(this.clientId)
      .subscribe(appointments => {
        this.appointments = appointments;
        this.dataSource = new MatTableDataSource(appointments);
        this.dataSource.sort = this.sort;
      });
  }

}
