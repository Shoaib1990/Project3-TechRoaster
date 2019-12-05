import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDataTechComponent } from './delete-data-tech.component';

describe('DeleteDataTechComponent', () => {
  let component: DeleteDataTechComponent;
  let fixture: ComponentFixture<DeleteDataTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDataTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDataTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
