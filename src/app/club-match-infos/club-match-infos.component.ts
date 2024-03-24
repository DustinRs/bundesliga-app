import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-club-match-infos',
  standalone: true,
  imports: [RouterModule,MatButtonModule,MatCardModule,HttpClientModule, CommonModule],
  templateUrl: './club-match-infos.component.html',
  styleUrl: './club-match-infos.component.scss'
})
export class ClubMatchInfosComponent {
  matchId: any;
  matchInfo: any = [];
  httpCLient = inject(HttpClient);
  team1ID:any;
  team2ID:any;
  team1Logo: any;
  team2Logo: any;
  pointsTeam1: any;
  pointsTeam2: any;
  team1Name: any;
  team2Name: any;
  pointsHalf1: any;
  pointsHalf2: any;
  groupName: any;
  constructor(private route:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.matchId = paramMap.get('id');
      this.fetchActualGameDayInfo(this.matchId);
  })
  }

  fetchActualGameDayInfo(matchId: any) {
    
        this.httpCLient
          .get(
            `https://api.openligadb.de/getmatchdata/${matchId}`
          )
          .subscribe((data: any) => {
            this.matchInfo = data;
            this.team1ID = this.matchInfo.team1.teamId;
            this.team2ID = this.matchInfo.team2.teamId;
            this.team1Logo = this.matchInfo.team1.teamIconUrl;
            this.team2Logo = this.matchInfo.team2.teamIconUrl;
            this.pointsTeam1 = this.matchInfo["matchResults"]["1"]["pointsTeam1"];
            this.pointsTeam2 = this.matchInfo["matchResults"]["1"]["pointsTeam2"];
            this.pointsHalf1 = this.matchInfo["matchResults"]["0"]["pointsTeam1"];
            this.pointsHalf2 = this.matchInfo["matchResults"]["0"]["pointsTeam2"];
            this.team1Name = this.matchInfo.team1.teamName;
            this.team2Name = this.matchInfo.team2.teamName;
            this.groupName = this.matchInfo.group.groupName;
          });
      
  }
}
