import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { EditAdressDialogComponent } from '../edit-adress-dialog/edit-adress-dialog.component';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  userId: any = '';
  userArray: any = [];
  newUser: User = new User();

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    const aCollection = collection(this.firestore, 'Users');
    this.items$ = collectionData(aCollection);
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('id');
      this.getUser();
    });
  }
  async getUser() {
    const querySnapshot = await getDocs(collection(this.firestore, 'Users'));
    let user = querySnapshot.docs.map((doc) => doc.data());
    this.userArray = user;
    let filteredUser = this.filterById(this.userArray, this.userId);
    this.newUser = new User(filteredUser[0]);
  }

  filterById(dataArray: any[], targetId: any) {
    return dataArray.filter((item: { id: any }) => item.id === targetId);
  }

  openAdressDialog() {}

  editMenu() {
    const dialog = this.dialog.open(EditAdressDialogComponent);
    dialog.componentInstance.user = new User(this.newUser.asJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(EditUserDialogComponent);
    dialog.componentInstance.user = new User(this.newUser.asJSON());
    dialog.componentInstance.userId = this.userId;
  }

  async deleteUser() {
    await deleteDoc(doc(this.firestore, 'Users', this.userId));
  }
}
