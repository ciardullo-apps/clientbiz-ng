import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ActivityYearMonth } from '../model/activity-year-month';
import { ReportService } from '../report.service';

@Component({
  selector: 'app-activity-year-month',
  templateUrl: './activity-year-month.component.html',
  styleUrls: ['./activity-year-month.component.css']
})
export class ActivityYearMonthComponent implements OnInit {

  contents: ActivityYearMonth[]
  displayedColumns = ['id', 'firstname', 'lastname', 'topic_name', 'starttime', 'duration', 'rate', 'billingpct', 'revenue', 'paid' ];
  dataSource;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private reportService: ReportService,
    private route: ActivatedRoute) { }
    
  ngOnInit(): void {
    this.getContents()
  }

  getContents(): void {
    const year= +this.route.snapshot.paramMap.get('year');
    const month = +this.route.snapshot.paramMap.get('month');
    console.log(year, month)

    this.reportService.getActivityByYearMonth(year, month)
      .subscribe(contents => {
        this.contents = contents;
        this.dataSource = new MatTableDataSource<ActivityYearMonth>(contents);
        this.dataSource.sort = this.sort;
      });
  }
}
