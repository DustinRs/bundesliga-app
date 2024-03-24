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
import { PlayerDetailsComponent } from '../player-details/player-details.component';

@Component({
  selector: 'app-club-players',
  standalone: true,
  imports: [HttpClientModule, MatCardModule, CommonModule],
  templateUrl: './club-players.component.html',
  styleUrl: './club-players.component.scss',
})
export class ClubPlayersComponent {
  clubName: any;
  club: any;
  players: any;
  players2: any;
  players3: any;
  st: any = [];
  mid: any = [];
  def: any = [];
  gk: any = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.clubName = paramMap.get('clubName');

      await this.getClub(this.clubName);
    });
  }

  async getClub(clubName: any) {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(`https://v3.football.api-sports.io/teams?search=${clubName}`, {
        headers: headers,
      })
      .subscribe((data) => {
        this.club = data['response']['0']['team']['id'];
        this.getPlayers1(this.club);
        this.getPlayers2(this.club);
        this.getPlayers3(this.club);
      });
  }

  getPlayers1(club: any) {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        `https://v3.football.api-sports.io/players?team=${club}&season=2023&page=1`,
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.players = data['response'];
        let stFiltered = this.players.filter(
          (p: any) => p.statistics['0'].games.position === 'Attacker'
        );
        this.st.push(stFiltered);
        let midFiltered = this.players.filter(
          (p: any) => p.statistics['0'].games.position === 'Midfielder'
        );
        this.mid.push(midFiltered);
        let defFiltered = this.players.filter(
          (p: any) => p.statistics['0'].games.position === 'Defender'
        );
        this.def.push(defFiltered);
        let gkFiltered = this.players.filter(
          (p: any) => p.statistics['0'].games.position === 'Goalkeeper'
        );
        this.gk.push(gkFiltered);
      });
  }

  getPlayers2(club: any) {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        `https://v3.football.api-sports.io/players?team=${club}&season=2023&page=2`,
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.players2 = data['response'];
        let stFiltered = this.players2.filter(
          (p: any) => p.statistics['0'].games.position === 'Attacker'
        );
        this.st.push(stFiltered);
        let midFiltered = this.players2.filter(
          (p: any) => p.statistics['0'].games.position === 'Midfielder'
        );
        this.mid.push(midFiltered);
        let defFiltered = this.players2.filter(
          (p: any) => p.statistics['0'].games.position === 'Defender'
        );
        this.def.push(defFiltered);
        let gkFiltered = this.players2.filter(
          (p: any) => p.statistics['0'].games.position === 'Goalkeeper'
        );
        this.gk.push(gkFiltered);
      });
  }

  getPlayers3(club: any) {
    let headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': '96b34608f0d79080f803b6f02ed320ff',
    });
    this.http
      .get<any>(
        `https://v3.football.api-sports.io/players?team=${club}&season=2023&page=3`,
        {
          headers: headers,
        }
      )
      .subscribe((data) => {
        this.players3 = data['response'];
        let stFiltered = this.players3.filter(
          (p: any) => p.statistics['0'].games.position === 'Attacker'
        );
        this.st.push(stFiltered);
        let midFiltered = this.players3.filter(
          (p: any) => p.statistics['0'].games.position === 'Midfielder'
        );
        this.mid.push(midFiltered);
        let defFiltered = this.players3.filter(
          (p: any) => p.statistics['0'].games.position === 'Defender'
        );
        this.def.push(defFiltered);
        let gkFiltered = this.players3.filter(
          (p: any) => p.statistics['0'].games.position === 'Goalkeeper'
        );
        this.gk.push(gkFiltered);
      });
  }

  openPlayerDetails(playerId: any, country: any) {
    const dialog = this.dialog.open(PlayerDetailsComponent);

    dialog.componentInstance.playerId = playerId;
    dialog.componentInstance.country = country;
  }
}
