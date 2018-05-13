import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicDocumentViewComponent } from './medic-document-view.component';

describe('MedicDocumentViewComponent', () => {
  let component: MedicDocumentViewComponent;
  let fixture: ComponentFixture<MedicDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
