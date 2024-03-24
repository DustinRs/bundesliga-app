import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-redcards',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, HttpClientModule, CommonModule],
  templateUrl: './redcards.component.html',
  styleUrl: './redcards.component.scss',
})
export class RedcardsComponent {
  httpCLient = inject(HttpClient);
  statisticsData: any;
  redCards: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        'https://v3.football.api-sports.io/players/topscorers?season=2023&league=78',
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.redCards = data['response'];
      });
  }
}
