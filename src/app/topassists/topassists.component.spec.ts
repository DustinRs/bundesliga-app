import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopassistsComponent } from './topassists.component';

describe('TopassistsComponent', () => {
  let component: TopassistsComponent;
  let fixture: ComponentFixture<TopassistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopassistsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopassistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
