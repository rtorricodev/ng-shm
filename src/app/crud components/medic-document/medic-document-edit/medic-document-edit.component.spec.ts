import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicDocumentEditComponent } from './medic-document-edit.component';

describe('MedicDocumentEditComponent', () => {
  let component: MedicDocumentEditComponent;
  let fixture: ComponentFixture<MedicDocumentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicDocumentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDocumentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
