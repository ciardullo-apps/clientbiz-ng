import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { MonthlyActivity } from './model/monthly-activity';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient,
    private authService: AuthService) {
  }

  getMonthlyActivity(): Observable<MonthlyActivity[]> {
    return this.http.get<MonthlyActivity[]>(`${environment.apiAddress}/monthly-activity`,
      {
        headers: this.authService.buildHeaders(),
        responseType: 'json'
      })
  }

}
