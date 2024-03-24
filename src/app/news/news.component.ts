import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  getDocs,
} from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  httpCLient = inject(HttpClient);
  news: any;
  value = '';
  items$: Observable<any[]>;
  allNews: any;
  constructor(private _http: HttpClient, public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'Users');
    this.items$ = collectionData(aCollection);
  }

  async ngOnInit() {
    this.fetchSeasonAllData();
  }

  fetchSeasonAllData() {
    this.httpCLient
      .get(
        `
      https://gnews.io/api/v4/search?q=bundesliga&lang=de&apikey=1c89134aac8e775bc6ec4329a47ffdf5`
      )
      .subscribe((data: any) => {
        this.news = data.articles;
      });
  }
}
