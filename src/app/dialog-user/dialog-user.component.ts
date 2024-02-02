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
  collection,
  collectionData,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { doc } from 'firebase/firestore';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-user',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSelectModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-user.component.html',
  styleUrl: './dialog-user.component.scss',
})
export class DialogUserComponent {
  httpCLient = inject(HttpClient);
  user = new User();
  birthDate!: Date;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  loading = false;
  clubs: any;

  constructor(
    public dialogRef: MatDialogRef<DialogUserComponent>,
    private _http: HttpClient
  ) {
    const aCollection = collection(this.firestore, 'Users');
    this.items$ = collectionData(aCollection);
  }

  ngOnInit() {
    this.fetchImgUrlData();
  }

  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    this.user.id = Date.now().toString();
    this.loading = true;
    await setDoc(
      doc(this.firestore, 'Users', this.user.id),
      this.user.asJSON()
    );
    this.loading = false;
    this.dialogRef.close();
    window.location.href = 'user';
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
