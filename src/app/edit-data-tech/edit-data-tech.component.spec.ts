import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataTechComponent } from './edit-data-tech.component';

describe('EditDataTechComponent', () => {
  let component: EditDataTechComponent;
  let fixture: ComponentFixture<EditDataTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDataTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDataTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
