import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBatimentComponent } from './detail-batiment.component';

describe('DetailBatimentComponent', () => {
  let component: DetailBatimentComponent;
  let fixture: ComponentFixture<DetailBatimentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailBatimentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailBatimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
