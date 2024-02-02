import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-clubs',
  standalone: true,
  imports: [RouterModule,MatButtonModule,MatCardModule, HttpClientModule, CommonModule],
  templateUrl: './clubs.component.html',
  styleUrl: './clubs.component.scss'
})
export class ClubsComponent {
  httpCLient = inject(HttpClient);
  clubsData: any;
  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this.fetchTableData();

    
  }

  fetchTableData() {
    let yearNumber = new Date().getFullYear() -1;
    let year = yearNumber.toString();
    
    this.httpCLient
      .get(`https://api.openligadb.de/getavailableteams/bl1/${year}`)
      .subscribe((data: any) => {
        this.clubsData = data;
        console.log('clubs', data);
      });
  }
}
