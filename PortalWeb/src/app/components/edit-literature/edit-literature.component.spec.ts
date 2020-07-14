import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLiteratureComponent } from './edit-literature.component';

describe('EditLiteratureComponent', () => {
  let component: EditLiteratureComponent;
  let fixture: ComponentFixture<EditLiteratureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLiteratureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLiteratureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
