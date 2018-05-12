import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { medicDocumentService } from './../../../services/medic.document.service';
import { MedicDocument } from './../../../models/medic-document';


@Component({
  selector: 'app-medic-document-list',
  templateUrl: './medic-document-list.component.html',
  styleUrls: ['./medic-document-list.component.scss'],
  providers: [medicDocumentService]
})
export class MedicDocumentListComponent implements OnInit {

  medicDocuments: Observable<MedicDocument[]>;

  constructor(private medicDocumentService: medicDocumentService) { }

  ngOnInit() {
    this.medicDocuments = this.medicDocumentService.getMedicDocuments();
  }

  delete(key: string) {
    this.medicDocumentService.deleteMedicDocument(key);
  }

}
