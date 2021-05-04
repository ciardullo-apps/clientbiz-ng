import { Component, OnInit } from '@angular/core';
import { Client } from '../model/client';
import { Appointment } from '../model/appointment';
import { ClientService, UpdateAppointmentResponse } from '../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { Topic } from '../model/topic';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.css']
})
export class AppointmentDetailComponent implements OnInit {

  clients: Client[];
  topics: Topic[];
  appointment: Appointment;

  constructor(
    private clientService: ClientService,
    private toastr: ToastrService) {
    }

  ngOnInit() {
    this.getClients();
    this.appointment = new Appointment();
    this.appointment.starttime = this.prevHourDate();
  }

  getClients(): void {
    this.clientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
      })
  }

  saveAppointment() : void {
    this.clientService.saveAppointment(this.appointment)
      .subscribe((response: UpdateAppointmentResponse) => {
        console.log(`Appointment id ${response.appointmentId} saved`);
        this.toastr.success(`Appointment id ${response.appointmentId} saved`);
      });
  }

  onClientChange(clientId: number) : void {
    this.clientService.getSelectedTopics(clientId)
      .subscribe(topics => {
        this.topics = topics
        if(this.topics.length == 1) {
          this.appointment.topic_id = topics[0].id
        } else {
          this.appointment.topic_id = null
        }
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
