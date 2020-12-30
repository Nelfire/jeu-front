import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePriveComponent } from './message-prive.component';

describe('MessagePriveComponent', () => {
  let component: MessagePriveComponent;
  let fixture: ComponentFixture<MessagePriveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagePriveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
