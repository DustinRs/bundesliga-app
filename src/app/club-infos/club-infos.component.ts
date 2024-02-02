import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-club-infos',
  standalone: true,
  imports: [RouterModule,MatButtonModule,MatCardModule,HttpClientModule, CommonModule],
  templateUrl: './club-infos.component.html',
  styleUrl: './club-infos.component.scss'
})
export class ClubInfosComponent {
  clubId: any;
  clubInfo: any = [];
  httpCLient = inject(HttpClient);
  constructor(private route:ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.clubId = paramMap.get('id');
      console.log(this.clubId)
      this.fetchClubInfo(this.clubId);
  })
  }

  fetchClubInfo(clubId: any) {
    
        this.httpCLient
          .get(
            `https://api.openligadb.de/getmatchesbyteamid/${clubId}/24/16`
          )
          .subscribe((data: any) => {
            this.clubInfo = data;
            console.log('akutelles Team', this.clubInfo);
          });
      
  }
}
