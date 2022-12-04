import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertDetailsComponent } from './concert-details.component';

describe('ConcertDetailsComponent', () => {
  let component: ConcertDetailsComponent;
  let fixture: ComponentFixture<ConcertDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
