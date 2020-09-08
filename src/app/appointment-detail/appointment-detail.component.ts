import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../model/client';
import { Appointment } from '../model/appointment';
import { ClientService, UpdateAppointmentResponse } from '../services/client.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  clients: Client[];
  topics: any[];
  appointment: Appointment;

  constructor(
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.getClients();
    this.getTopics();
    this.appointment = new Appointment();
    this.appointment.starttime = this.prevHourDate();
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
        this.topics = topics
      });
  }

  saveAppointment() : void {
    this.clientService.saveAppointment(this.appointment)
      .subscribe((response: UpdateAppointmentResponse) => {
        console.log(`Appointment id ${response.appointmentId} saved`);
      });
  }

  prevHourDate() : Date {
    // Return to prior hour
    var prevHour = new Date();
    prevHour.setMinutes(0);
    prevHour.setHours(prevHour.getHours() - 1);
    return prevHour;
  }
}
