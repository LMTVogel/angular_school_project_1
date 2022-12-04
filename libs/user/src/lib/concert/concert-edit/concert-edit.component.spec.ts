import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertEditComponent } from './concert-edit.component';

describe('ConcertEditComponent', () => {
  let component: ConcertEditComponent;
  let fixture: ComponentFixture<ConcertEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
