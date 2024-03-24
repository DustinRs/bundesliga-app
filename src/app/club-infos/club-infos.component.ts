import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-club-infos',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './club-infos.component.html',
  styleUrl: './club-infos.component.scss',
})
export class ClubInfosComponent {
  clubId: any;
  clubInfo: any = [];
  clubName: any;
  httpCLient = inject(HttpClient);
  players: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.clubId = paramMap.get('id');
      this.fetchClubInfo(this.clubId);
      this.fetchClubName(this.clubId);
    });
  }

  fetchClubInfo(clubId: any) {
    this.httpCLient
      .get(`https://api.openligadb.de/getmatchesbyteamid/${clubId}/24/16`)
      .subscribe((data: any) => {
        this.clubInfo = data;
      });
  }

  fetchClubName(clubId: any) {
    this.httpCLient
      .get(`https://api.openligadb.de/getavailableteams/bl1/2023`)
      .subscribe((data: any) => {
        this.clubName = data.filter((n: any) => n['teamId'] === Number(clubId));
        this.clubName = this.clubName['0']['teamName'];
        this.clubName = this.removeSpaceNumber(this.clubName.toLowerCase());
      });
  }

  removeSpaceNumber(text: string): string {
    if (text === 'bayer leverkusen') {
      text = text.replace(/(?:bayer)/gi, '');
      text = text.replace(/[^\p{L}]/gu, '');
    } else {
      text = text.replace(
        /(?:fc|borussia|fsv|eintracht|sc|vfb|vfl|sv|münchen|tsg|mönchen|rb)/gi,
        ''
      );
      text = text.replace(/[^\p{L}]/gu, '');
    }

    return text;
  }
}
