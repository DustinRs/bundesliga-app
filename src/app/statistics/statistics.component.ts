import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {
  httpCLient = inject(HttpClient);
  statisticsData: any;
  goalGetters: any;
  assists: any;
  yellowCards: any;
  redCards: any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGoals();
    this.getAssists();
    this.getYellowCards();
    this.getRedCards();
  }

  getGoals() {
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
        this.goalGetters = data['response'];
        console.log('goalGetters=', this.goalGetters);
      });
  }

  getAssists() {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        'https://v3.football.api-sports.io/players/topassists?season=2023&league=78',
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.assists = data['response'];
        console.log('topassists=', this.assists);
      });
  }

  getYellowCards() {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        'https://v3.football.api-sports.io/players/topyellowcards?season=2023&league=78',
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.yellowCards = data['response'];
        console.log('topassists=', this.yellowCards);
      });
  }

  getRedCards() {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        'https://v3.football.api-sports.io/players/topredcards?season=2023&league=78',
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.redCards = data['response'];
        console.log('topassists=', this.redCards);
      });
  }
}
