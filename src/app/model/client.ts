export class Client {
  id: number;
  firstname: string;
  lastname: string;
  assigned_topics?: number[];
  contactname: string;
  city: string;
  state: string;
  firstcontact: Date;
  firstresponse: Date;
  timezone: string;
  solicited: boolean;
  numappts: number;
  revenue: number;
  lastapptdate: string;
}
