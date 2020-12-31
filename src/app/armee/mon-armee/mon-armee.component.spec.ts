import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonArmeeComponent } from './mon-armee.component';

describe('MonArmeeComponent', () => {
  let component: MonArmeeComponent;
  let fixture: ComponentFixture<MonArmeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonArmeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonArmeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
