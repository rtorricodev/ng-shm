import { Component, OnInit } from '@angular/core';
import { MedicDocument } from './../../../models/medic-document';
import { medicDocumentService } from './../../../services/medic.document.service';

@Component({
  selector: 'app-medic-document-add',
  templateUrl: './medic-document-add.component.html',
  styleUrls: ['./medic-document-add.component.scss']
})
export class MedicDocumentAddComponent implements OnInit {

  constructor(private medicDocumentService: medicDocumentService) { }

  save(event: MedicDocument){
    this.medicDocumentService.createMedicDocument(event);
  }

  ngOnInit() {
  }

}
