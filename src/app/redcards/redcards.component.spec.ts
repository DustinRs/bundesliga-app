import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedcardsComponent } from './redcards.component';

describe('RedcardsComponent', () => {
  let component: RedcardsComponent;
  let fixture: ComponentFixture<RedcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedcardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RedcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
