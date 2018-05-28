import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReminderService } from './../../../services/reminder.service';
import { Reminder } from './../../../models/reminder';


@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  saving = false;

  @Input() reminder: Reminder;

  @Output() onSubmit: EventEmitter<any>;

  constructor(private reminderService: ReminderService) { 
    this.onSubmit = new EventEmitter<any>();
  }

  ngOnInit() {
    if (!this.reminder) {
      let file = null;
      this.reminder = new Reminder();
    }
  }

  save() {
    this.saving = true;
    this.onSubmit.emit(this.reminder);
  }


}
