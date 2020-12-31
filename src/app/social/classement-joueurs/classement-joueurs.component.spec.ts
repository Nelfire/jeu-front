import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassementJoueursComponent } from './classement-joueurs.component';

describe('ClassementJoueursComponent', () => {
  let component: ClassementJoueursComponent;
  let fixture: ComponentFixture<ClassementJoueursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassementJoueursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassementJoueursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
