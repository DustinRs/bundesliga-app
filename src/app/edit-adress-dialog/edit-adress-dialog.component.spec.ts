import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdressDialogComponent } from './edit-adress-dialog.component';

describe('EditAdressDialogComponent', () => {
  let component: EditAdressDialogComponent;
  let fixture: ComponentFixture<EditAdressDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdressDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAdressDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
