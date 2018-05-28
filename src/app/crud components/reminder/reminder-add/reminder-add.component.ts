import { Component, OnInit } from '@angular/core';
import { Reminder } from './../../../models/reminder';
import { ReminderService } from './../../../services/reminder.service';

@Component({
  selector: 'app-reminder-add',
  templateUrl: './reminder-add.component.html',
  styleUrls: ['./reminder-add.component.scss']
})
export class ReminderAddComponent implements OnInit {

  constructor(private reminderService: ReminderService) { }

  save(event: Reminder){
    this.reminderService.createReminder(event);

  }

  ngOnInit() {
  }

}
