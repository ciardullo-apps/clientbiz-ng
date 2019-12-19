import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { Client } from '../model/client';
import { Appointment } from '../model/appointment';
import { Receivable } from '../model/receivable';

export class UpdatePaidDateResponse {
  updatedAppointmentId: number
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

}
