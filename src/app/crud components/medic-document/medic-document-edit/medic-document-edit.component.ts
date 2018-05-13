import { Component, OnInit } from '@angular/core';
import { MedicDocument } from './../../../models/medic-document';
import { ActivatedRoute } from '@angular/router';
import { medicDocumentService } from './../../../services/medic.document.service';


@Component({
  selector: 'app-medic-document-edit',
  templateUrl: './medic-document-edit.component.html',
  styleUrls: ['./medic-document-edit.component.scss']
})
export class MedicDocumentEditComponent implements OnInit {

  medicDocument: MedicDocument = null;

  constructor(private route: ActivatedRoute, private medicDocumentService: medicDocumentService) { }

  ngOnInit() {
    this.getMedicDocument(this.route.snapshot.params['id']);
  }

  getMedicDocument(key:string) {
    this.medicDocumentService.getMedicDocument(key)
      .then( medicDocument => this.medicDocument = medicDocument);
  }

  save(event: MedicDocument) {
    this.medicDocumentService.updateMedicDocument(this.route.snapshot.params['id'],event)
  }

}
