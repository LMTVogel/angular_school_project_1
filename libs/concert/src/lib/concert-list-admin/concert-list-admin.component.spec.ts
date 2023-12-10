import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcertListAdminComponent } from './concert-list-admin.component';

describe('ConcertListComponent', () => {
  let component: ConcertListAdminComponent;
  let fixture: ComponentFixture<ConcertListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcertListAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConcertListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
