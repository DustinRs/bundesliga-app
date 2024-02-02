import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMatchInfosComponent } from './club-match-infos.component';

describe('ClubMatchInfosComponent', () => {
  let component: ClubMatchInfosComponent;
  let fixture: ComponentFixture<ClubMatchInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClubMatchInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClubMatchInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
