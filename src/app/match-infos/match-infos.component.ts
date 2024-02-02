import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-match-infos',
  standalone: true,
  imports: [RouterModule,MatButtonModule,MatCardModule,HttpClientModule, CommonModule],
  templateUrl: './match-infos.component.html',
  styleUrl: './match-infos.component.scss'
})
export class MatchInfosComponent {
  matchId: any;
  matchInfo: any = [];
  httpCLient = inject(HttpClient);
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
            console.log('akutelles Match', this.matchInfo);
          });
      
  }
}
