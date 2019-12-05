import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataTechComponent } from './add-data-tech.component';

describe('AddDataTechComponent', () => {
  let component: AddDataTechComponent;
  let fixture: ComponentFixture<AddDataTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
