import { Component, OnInit } from '@angular/core';
import { ReminderService } from './../../../services/reminder.service';
import { Reminder } from './../../../models/reminder';
import { ActivatedRoute } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reminder-edit',
  templateUrl: './reminder-edit.component.html',
  styleUrls: ['./reminder-edit.component.scss']
})
export class ReminderEditComponent implements OnInit {

  reminder: Reminder = null;

  constructor(private route: ActivatedRoute,private reminderService: ReminderService) { }

  ngOnInit() {
    this.getReminder(this.route.snapshot.params['id']);
  }

  getReminder(key: string) {
    this.reminderService.getReminder(key)
    .then( medicDocument => this.reminder = medicDocument);
  }

  save(event: Reminder) {
    this.reminderService.updateReminder(this.route.snapshot.params['id'],event);
  }

}
