export class Appointment {
  id: number;
  client_id: number;
  topic_id: number;
  topic_name: string;
  starttime: Date;
  duration: number;
  rate: number;
  billingpct: number;
  paid?: string;
  description?: string;
}
