import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { medicDocumentService } from './../../../services/medic.document.service';
import { MedicDocument } from './../../../models/medic-document';


// _
import * as $ from 'jquery';
import * as _ from "lodash";


@Component({
  selector: 'app-medic-document-form',
  templateUrl: './medic-document-form.component.html',
  styleUrls: ['./medic-document-form.component.scss']
})
export class MedicDocumentFormComponent implements OnInit {

  selectedFiles: FileList;

  saving = false;

  @Input() medicDocument: MedicDocument;

  @Output() onSubmit: EventEmitter<any>;

  constructor(private upSvc: medicDocumentService) {
    this.onSubmit = new EventEmitter<any>();
  }

  ngOnInit() {
    if (!this.medicDocument) {
      let file = null;
      this.medicDocument = new MedicDocument(file);
    }
  }

  save() {
    this.saving = true;
    this.onSubmit.emit(this.medicDocument);
  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
    this.medicDocument.file = this.selectedFiles.item(0);
    this.upSvc.pushUpload(this.medicDocument);
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0);
    this.medicDocument = new MedicDocument(file);
  }

  uploadMulti() {
    let files = this.selectedFiles;
    let filesIndex = _.range(files.length);
    _.each(filesIndex, (idx) => {
      this.medicDocument = new MedicDocument(files[idx]);
      this.upSvc.pushUpload(this.medicDocument);
    })
  }

}
