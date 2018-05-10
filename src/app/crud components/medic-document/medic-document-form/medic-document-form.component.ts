import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { MedicDocument } from './../../../models/medic-document';


@Component({
  selector: 'app-medic-document-form',
  templateUrl: './medic-document-form.component.html',
  styleUrls: ['./medic-document-form.component.scss']
})
export class MedicDocumentFormComponent implements OnInit {

  saving = false;

  @Input() medicDocument: MedicDocument;

  @Output() onSubmit: EventEmitter<any>;

  constructor() {
    this.onSubmit = new EventEmitter<any>();
   }

  ngOnInit() {
    if (!this.medicDocument) {
      this.medicDocument = new MedicDocument();
    }
  }

  save() {
    this.saving = true;
    this.onSubmit.emit(this.medicDocument);
  }

}
