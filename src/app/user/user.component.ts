import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  httpCLient = inject(HttpClient);
  user = new User();
  allUsers: any;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  loading = false;
  imgUrl:any;

  constructor(public dialog: MatDialog, private _http: HttpClient) {
    const aCollection = collection(this.firestore, 'Users');
    this.items$ = collectionData(aCollection);
  }

  async ngOnInit() {
    const querySnapshot = await getDocs(collection(this.firestore, 'Users'));
    let user = querySnapshot.docs.map((doc) => doc.data());
    this.allUsers = user;
    this.fetchImgUrlData();
  }

  openDialog() {
    this.dialog.open(DialogUserComponent);
  }

  async deleteUser(id: string) {
    await deleteDoc(doc(this.firestore, 'Users', id));
  }

  fetchImgUrlData() {
    let yearNumber = new Date().getFullYear() -1;
    let year = yearNumber.toString();
    
    this.httpCLient
      .get(`https://api.openligadb.de/getavailableteams/bl1/${year}`)
      .subscribe((data: any) => {
        this.imgUrl = data;
        console.log('imgUrl', data);
      });
  }
}
