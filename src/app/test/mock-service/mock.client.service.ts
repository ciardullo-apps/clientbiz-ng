import { of, Observable } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { clientTestData } from '../mock-data/client-test-data';
import { appointmentTestData } from '../mock-data/appointment-test-data';
import { Receivable } from 'src/app/model/receivable';
import { receivableTestData } from '../mock-data/receivable-test-data';
import { Client } from 'src/app/model/client';
import { Appointment } from 'src/app/model/appointment';

export class MockClientService extends ClientService {
  public getClients(): Observable<Client[]> {
    return of(clientTestData);
  }

  public getAppointments(clientId: number) : Observable<Appointment[]>{
    return of(appointmentTestData.filter(appointment => appointment.client_id == clientId));
  }

  public getClient(clientId: number): Observable<Client> {
    // console.log(clientTestData.find(client => client.clientId == clientId));
    return of(clientTestData.find(client => client.clientId == clientId));
    // return of(clientTestData.filter(c => c.id == clientId)[0]);
  }

  public getReceivables(): Observable<Receivable[]> {
    return of(receivableTestData);
  }

}
