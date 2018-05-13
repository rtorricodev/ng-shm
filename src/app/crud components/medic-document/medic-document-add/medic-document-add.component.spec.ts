import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicDocumentAddComponent } from './medic-document-add.component';

describe('MedicDocumentAddComponent', () => {
  let component: MedicDocumentAddComponent;
  let fixture: ComponentFixture<MedicDocumentAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicDocumentAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDocumentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
