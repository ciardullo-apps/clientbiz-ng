import { Client } from "src/app/model/client";

export const clientTestData : Client[] = [
  {
    id: 101,
    clientId: 101,
    firstname: 'Jane',
    lastname: 'Doe',
    assigned_topics: [1, 2],
    contactname: 'No one',
    city: 'Anytown',
    state: 'DE',
    firstcontact: new Date(Date.parse('2019-01-01T12:15:00')),
    firstresponse: new Date(Date.parse('2019-01-02T11:45:00')),
    timezone: 'US/Eastern',
    solicited: true,
    numappts: 1,
    revenue: 10.00,
    lastapptdate: '2019-01-03'
  },
  {
    id: 102,
    clientId: 102,
    firstname: 'Anne',
    lastname: 'Roe',
    assigned_topics: [1, 2],
    contactname: 'Anyone',
    city: 'Sometown',
    state: 'NE',
    firstcontact: null,
    firstresponse: new Date(Date.parse('2019-02-02T11:45 AM')),
    timezone: 'US/Mountain',
    solicited: false,
    numappts: 2,
    revenue: 20.00,
    lastapptdate: '2019-02-03'
  }
];
