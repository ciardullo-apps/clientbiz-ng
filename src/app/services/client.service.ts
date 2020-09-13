import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Client } from '../model/client';
import { Appointment } from '../model/appointment';
import { Receivable } from '../model/receivable';
import { Topic } from '../model/topic';

export class UpdatePaidDateResponse {
  updatedAppointmentId: number
}

export class UpdateClientResponse {
  updatedClientId: number
}

export class UpdateAppointmentResponse {
  appointmentId: number;
  constructor( id: number) {
    this.appointmentId = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiAddress}/client`);
    // return of(CLIENTS);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${environment.apiAddress}/client/${id}`);
  }

  getAppointments(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiAddress}/appointments/${id}`);
  }

  getReceivables(): Observable<Receivable[]> {
    return this.http.get<Receivable[]>(`${environment.apiAddress}/receivables`);
  }

  markPaid(appointmentId : number, paidDate: Date) : Observable<UpdatePaidDateResponse> {
    console.log('Marking paid', appointmentId);
    return this.http.post<UpdatePaidDateResponse>(`${environment.apiAddress}/updatePaidDate`,
    {
      id: (appointmentId),
      paid: paidDate
    });
  }

  saveClient(client: Client) : Observable<UpdateClientResponse> {
    console.log('Saving client 2', client.id);
    return this.http.post<UpdateClientResponse>(`${environment.apiAddress}/saveClient`,
      client
    );
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiAddress}/topics`);
  }

  saveAppointment(appointment: Appointment) : Observable<UpdateAppointmentResponse> {
    console.log('Saving appointment', appointment);
    return this.http.post<UpdateAppointmentResponse>(`${environment.apiAddress}/saveAppointment`,
      appointment
    );
  }

  getSelectedTopics(clientId): Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiAddress}/topics/${clientId}`);
  }

}
