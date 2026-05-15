export class Receivable {
  appointment_id: number;
  firstname: string | null
  lastname: string | null
  topicname: string | null
  starttime: string | null
  duration: number
  rate: number
  billingpct: number
  paid: Date | null

  constructor() {
    this.appointment_id = 0
    this.firstname = null
    this.lastname = null
    this.topicname = null
    this.starttime = null
    this.duration = 0
    this.rate= 0
    this.billingpct = 0
    this.paid = null
  }
}
