import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReminderService } from './../../../services/reminder.service';
import { Reminder } from './../../../models/reminder';


@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {

  reminders: Observable<Reminder[]>;

  constructor(private reminderService: ReminderService ) { }

  ngOnInit() {
    this.getAllReminders();
  }

  getAllReminders() {
    this. reminders = this.reminderService.getReminders();
  }

  deleteItem(key: string) {
    this.reminderService.deleteReminder(key);
  }
}
