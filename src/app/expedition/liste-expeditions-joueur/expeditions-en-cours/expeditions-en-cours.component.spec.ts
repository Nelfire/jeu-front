import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionsEnCoursComponent } from './expeditions-en-cours.component';

describe('ExpeditionsEnCoursComponent', () => {
  let component: ExpeditionsEnCoursComponent;
  let fixture: ComponentFixture<ExpeditionsEnCoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpeditionsEnCoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionsEnCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
