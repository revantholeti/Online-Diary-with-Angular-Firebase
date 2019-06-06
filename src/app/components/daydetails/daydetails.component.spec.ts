import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaydetailsComponent } from './daydetails.component';

describe('DaydetailsComponent', () => {
  let component: DaydetailsComponent;
  let fixture: ComponentFixture<DaydetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaydetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
