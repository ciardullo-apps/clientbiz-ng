import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from '../report.service';
import { MonthlyActivity } from '../model/monthly-activity'

@Component({
  selector: 'app-monthly-activity',
  templateUrl: './monthly-activity.component.html',
  styleUrls: ['./monthly-activity.component.css']
})
export class MonthlyActivityComponent implements OnInit {

  contents: MonthlyActivity[]
  columnHeaders = ['Month - Year', 'Clients', 'Appointments', 'Hours', 'Revenue', 'Average Rate']
  displayedColumns = ['monthOfYear', 'totalClients', 'totalAppointments', 'totalHours', 'totalRevenue', 'averageRate' ];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.getContents();
  }

  getContents(): void {
    this.reportService.getMonthlyActivity()
      .subscribe(contents => {
        this.contents = contents;
        this.dataSource = new MatTableDataSource<MonthlyActivity>(contents);
        this.dataSource.sort = this.sort;
      });
  }


}
