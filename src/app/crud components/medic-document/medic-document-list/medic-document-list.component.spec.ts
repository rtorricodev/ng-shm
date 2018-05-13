import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicDocumentListComponent } from './medic-document-list.component';

describe('MedicDocumentListComponent', () => {
  let component: MedicDocumentListComponent;
  let fixture: ComponentFixture<MedicDocumentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicDocumentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicDocumentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
