import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Client } from '../model/client';
import { Appointment } from '../model/appointment';
import { Receivable } from '../model/receivable';
import { Topic } from '../model/topic';
import { AuthService } from './auth.service';

export class UpdatePaidDateResponse {
  updatedAppointmentId: number
}

export class UpdateClientResponse {
  updatedClientId: number
}

export class UpdateAppointmentResponse {
  appointmentId: number;
  constructor(id: number) {
    this.appointmentId = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient,
    private authService: AuthService) {
    }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${environment.apiAddress}/client`,
    {
      headers: this.authService.buildHeaders(),
      responseType: 'json'
    })
    // return of(CLIENTS);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${environment.apiAddress}/client/${id}`,
      {
        headers: this.authService.buildHeaders(),
        responseType: 'json'
      })
  }

  getAppointments(id: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${environment.apiAddress}/appointments/${id}`,
      {
        headers: this.authService.buildHeaders(),
        responseType: 'json'
      })
    }

  getReceivables(): Observable<Receivable[]> {
    return this.http.get<Receivable[]>(`${environment.apiAddress}/receivables`,
      {
        headers: this.authService.buildHeaders(),
        responseType: 'json'
      })
  }

  markPaid(appointmentId : number, paidDate: Date) : Observable<UpdatePaidDateResponse> {
    console.log('Marking paid', appointmentId);
    return this.http.post<UpdatePaidDateResponse>(`${environment.apiAddress}/updatePaidDate`,
    {
      id: (appointmentId),
      paid: paidDate
    },
    {
      headers: this.authService.buildHeaders()
    }
  );
  }

  saveClient(client: Client) : Observable<UpdateClientResponse> {
    console.log('Saving client 2', client.id);
    return this.http.post<UpdateClientResponse>(`${environment.apiAddress}/saveClient`,
      client,
      {
        headers: this.authService.buildHeaders()
      }
    );
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiAddress}/topics`);
  }

  saveAppointment(appointment: Appointment) : Observable<UpdateAppointmentResponse> {
    console.log('Saving appointment', appointment);
    return this.http.post<UpdateAppointmentResponse>(`${environment.apiAddress}/saveAppointment`,
      appointment,
      {
        headers: this.authService.buildHeaders()
      }
    );
  }

  getSelectedTopics(clientId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${environment.apiAddress}/topics/${clientId}`,
      {
        headers: this.authService.buildHeaders(),
        responseType: 'json'
      })
  }

}
