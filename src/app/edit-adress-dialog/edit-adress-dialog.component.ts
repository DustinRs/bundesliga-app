import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import {
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { doc, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-edit-adress-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: './edit-adress-dialog.component.html',
  styleUrl: './edit-adress-dialog.component.scss',
})
export class EditAdressDialogComponent {
  loading = false;
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  user!: User;
  userId!: string | any;

  constructor(public dialogRef: MatDialogRef<EditAdressDialogComponent>) {
    const aCollection = collection(this.firestore, 'Users');
    this.items$ = collectionData(aCollection);
  }
  async saveUser() {
    this.loading = true;
    const editedUser = doc(collection(this.firestore, 'Users'), this.userId);
    await updateDoc(editedUser, {
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city,
    });

    this.loading = false;
    this.dialogRef.close();
  }
}
