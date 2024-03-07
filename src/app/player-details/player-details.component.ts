import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-player-details',
  standalone: true,
  imports: [HttpClientModule,MatIconModule, MatCardModule, CommonModule],
  templateUrl: './player-details.component.html',
  styleUrl: './player-details.component.scss'
})
export class PlayerDetailsComponent {
  playerId: any;
  playerDetails: any;
  country: any;
  flag: any;

  constructor(
    public dialogRef: MatDialogRef<PlayerDetailsComponent>,
    private http: HttpClient,
  ){}

ngOnInit(){
  
  this.getPlayerDetails(this.playerId);
  console.log(this.country)
  this.getCountryFlag(this.country);
}

getPlayerDetails(id:any){
console.log(id)
let headers = new HttpHeaders({
  'x-rapidapi-host': 'v3.football.api-sports.io',
  'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
});
this.http
  .get<any>(
    `https://v3.football.api-sports.io/players?id=${id}&season=2023`,
    {
      headers: headers,
    }
  )
  .subscribe((data) => {
    this.playerDetails = data['response']['0'];
    console.log('this.playerDetails',this.playerDetails);
  });
}

getCountryFlag(country:any) {
  let headers = new HttpHeaders({
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
  });
  this.http
    .get<any>(
      `https://v3.football.api-sports.io/countries`,
      {
        headers: headers,
      }
    )
    .subscribe((data) => {
      this.flag = data['response'].filter((c:any) => c['name'] === country);
      this.flag = this.flag['0']['flag'];
      console.log('this.flag',this.flag);
    });
}

  close() {
    this.dialogRef.close();
  }
}
