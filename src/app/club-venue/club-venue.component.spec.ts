import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubVenueComponent } from './club-venue.component';

describe('ClubVenueComponent', () => {
  let component: ClubVenueComponent;
  let fixture: ComponentFixture<ClubVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubVenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
