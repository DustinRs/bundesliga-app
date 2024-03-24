import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  httpCLient = inject(HttpClient);
  seasonData: any;
  gameDay: any;
  gameDayName: any;
  gameDayNameNumber: any;
  gameDayNumber: any = [];
  gameDaysFiltered: any = [];
  matches: any = [];
  idDay: any;

  constructor(private _http: HttpClient, public dialog: MatDialog) {}

  ngOnInit(day?: string) {
    if (day == undefined) {
      this.fetchSeasonAllData();

      this.fetchActualGameDay();
      this.fetchActualGameDayInfo();
    } else {
      this.fetchSeasonAllData();
      this.fetchSelectedGameDayInfo(day);
    }
  }

  fetchSeasonAllData() {
    let yearNumber = new Date().getFullYear() - 1;
    let year = yearNumber.toString();
    let gameDays: any[] = [];
    let gameDaysFiltered: any[] = [];
    this.httpCLient
      .get(`https://api.openligadb.de/getmatchdata/bl1/${year}`)
      .subscribe((data: any) => {
        this.seasonData = data;

        for (let i = 0; i < this.seasonData.length; i++) {
          const gamedays = this.seasonData[i]['group']['groupName'];
          gameDays.push(gamedays);
        }
        for (let j = 0; j < 34; j++) {
          let day = gameDays[j * 9];
          gameDaysFiltered.push(day);
        }
        this.gameDaysFiltered.push(gameDaysFiltered);
      });
  }

  fetchActualGameDay() {
    this.httpCLient
      .get('https://api.openligadb.de/getcurrentgroup/bl1')
      .subscribe((data: any) => {
        this.gameDay = data;
        this.gameDayName = this.gameDay.groupName;
        this.gameDayNameNumber = parseInt(this.gameDayName);
      });
  }
  fetchActualGameDayInfo() {
    let yearNumber = new Date().getFullYear() - 1;
    let year = yearNumber.toString();
    this.httpCLient
      .get('https://api.openligadb.de/getcurrentgroup/bl1')
      .subscribe((data: any) => {
        this.gameDay = data;
        let dayNumber = this.gameDay.groupOrderID.toString();

        this.httpCLient
          .get(
            `https://api.openligadb.de/getmatchdata/bl1/${year}/${dayNumber}`
          )
          .subscribe((data: any) => {
            this.matches = data;
          });
      });
  }

  getGameDay(id: string) {
    let day = this.filterId(id);

    this.ngOnInit(day.toString());
  }

  getNextGameDay(id: string) {
    let day = parseInt(id);
    this.ngOnInit(day.toString());
  }

  getPreviousGameDay(id: string) {
    let day = parseInt(id);
    this.ngOnInit(day.toString());
  }

  fetchSelectedGameDayInfo(idDay: string) {
    let yearNumber = new Date().getFullYear() - 1;
    let year = yearNumber.toString();
    this.httpCLient
      .get(`https://api.openligadb.de/getmatchdata/bl1/${year}/${idDay}`)
      .subscribe((data: any) => {
        this.matches = data;
        this.gameDayName = idDay + '. Spieltag';
        this.gameDayNameNumber = parseInt(idDay);
      });
  }
  filterId(id: string) {
    const match = id.match(/\d+/);
    if (match) {
      return parseInt(match[0], 10);
    }
    return '0';
  }
}
