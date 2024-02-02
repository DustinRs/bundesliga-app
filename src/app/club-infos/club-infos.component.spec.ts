import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubInfosComponent } from './club-infos.component';

describe('ClubInfosComponent', () => {
  let component: ClubInfosComponent;
  let fixture: ComponentFixture<ClubInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
