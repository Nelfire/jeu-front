import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserJoueurComponent } from './visualiser-joueur.component';

describe('VisualiserJoueurComponent', () => {
  let component: VisualiserJoueurComponent;
  let fixture: ComponentFixture<VisualiserJoueurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualiserJoueurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserJoueurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
