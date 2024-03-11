import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-club-venue',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, CommonModule],
  templateUrl: './club-venue.component.html',
  styleUrl: './club-venue.component.scss'
})
export class ClubVenueComponent {
  clubName: any;
  venue: any;



  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.clubName = paramMap.get('clubName');
      console.log('clubname=', this.clubName);
      this.getClub(this.clubName);
    });
  }

  getClub(clubName: any) {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(`https://v3.football.api-sports.io/teams?search=${clubName}`, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log('data=', data);
        this.venue = data['response']['0']['venue'];
        
      });
  }
}
