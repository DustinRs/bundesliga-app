import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    MatProgressBarModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {
  httpCLient = inject(HttpClient);
  loading = false;
  user!: User;
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  userId!: string | any;
  clubs: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private _http: HttpClient
  ) {
    const aCollection = collection(this.firestore, 'Users');
    this.items$ = collectionData(aCollection);
  }

  ngOnInit() {
    this.fetchImgUrlData();
  }

  async saveUser() {
    this.loading = true;
    const editedUser = doc(collection(this.firestore, 'Users'), this.userId);
    await updateDoc(editedUser, {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.birthDate,
      club: this.user.club,
    });

    this.loading = false;
    this.dialogRef.close();
  }

  fetchImgUrlData() {
    let yearNumber = new Date().getFullYear() - 1;
    let year = yearNumber.toString();

    this.httpCLient
      .get(`https://api.openligadb.de/getavailableteams/bl1/${year}`)
      .subscribe((data: any) => {
        this.clubs = data;
        console.log('imgUrl', data);
      });
  }
}
