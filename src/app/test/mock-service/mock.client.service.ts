import { of } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { clientTestData } from '../mock-data/client-test-data';
import { appointmentTestData } from '../mock-data/appointment-test-data';

export class MockClientService extends ClientService {
  public getClients() {
    return of(clientTestData);
  }

  public getAppointments(clientId) {
    return of(appointmentTestData.filter(appointment => appointment.client_id == clientId));
  }
}
