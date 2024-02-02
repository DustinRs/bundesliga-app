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
  constructor(private route:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.matchId = paramMap.get('id');
      console.log(this.matchId)
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
            console.log('akutelles Match', this.team1ID);
          });
      
  }
}
