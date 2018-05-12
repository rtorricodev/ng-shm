import { Component, OnInit } from '@angular/core';
import { medicDocumentService } from './../../../services/medic.document.service';
import { ActivatedRoute } from '@angular/router';
import { MedicDocument } from './../../../models/medic-document';

@Component({
  selector: 'app-medic-document-view',
  templateUrl: './medic-document-view.component.html',
  styleUrls: ['./medic-document-view.component.scss']
})
export class MedicDocumentViewComponent implements OnInit {

  medicDocument: MedicDocument = null;

  constructor(private route: ActivatedRoute, private medicDocumentService: medicDocumentService) { }

  ngOnInit() {
    this.getMedicDocument(this.route.snapshot.params['id']);
  }

  getMedicDocument(key: string) {
    return this.medicDocumentService.getMedicDocument(key)
      .then(medicDocument => this.medicDocument = medicDocument);
  }

}
