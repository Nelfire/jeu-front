import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionsTermineesComponent } from './expeditions-terminees.component';

describe('ExpeditionsTermineesComponent', () => {
  let component: ExpeditionsTermineesComponent;
  let fixture: ComponentFixture<ExpeditionsTermineesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpeditionsTermineesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionsTermineesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
