import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiserCollaborateurComponent } from './visualiser-collaborateur.component';

describe('VisualiserCollaborateurComponent', () => {
  let component: VisualiserCollaborateurComponent;
  let fixture: ComponentFixture<VisualiserCollaborateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualiserCollaborateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualiserCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
