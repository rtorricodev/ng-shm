import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicDocumentFormComponent } from './medic-document-form.component';

describe('MedicDocumentFormComponent', () => {
  let component: MedicDocumentFormComponent;
  let fixture: ComponentFixture<MedicDocumentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicDocumentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDocumentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
