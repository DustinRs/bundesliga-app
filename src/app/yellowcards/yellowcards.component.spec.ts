import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowcardsComponent } from './yellowcards.component';

describe('YellowcardsComponent', () => {
  let component: YellowcardsComponent;
  let fixture: ComponentFixture<YellowcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YellowcardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YellowcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
