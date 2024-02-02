import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatButtonModule,MatCardModule, HttpClientModule, CommonModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  httpCLient = inject(HttpClient);
  statisticsData: any;
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.fetchTableData();

    
  }

  fetchTableData() {
    let yearNumber = new Date().getFullYear() -1;
    let year = yearNumber.toString();
    
    this.httpCLient
      .get(`https://api.openligadb.de/getgoalgetters/bl1/${year}`)
      .subscribe((data: any) => {
        this.statisticsData = data;
        console.log('goalgetters', data);
        
      });
  }
}
