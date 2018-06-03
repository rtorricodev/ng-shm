import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ReminderService } from './../../../services/reminder.service';
import { Reminder } from './../../../models/reminder';

@Component({
  selector: 'app-reminder-view',
  templateUrl: './reminder-view.component.html',
  styleUrls: ['./reminder-view.component.scss']
})
export class ReminderViewComponent implements OnInit {

  reminder: Reminder = null;

  constructor(private route: ActivatedRoute,
              private router: Router, 
              private reminderService: ReminderService
            ) { }

  ngOnInit() {
    this.getReminder(this.route.snapshot.params['id']);
  }

  getReminder(key: string) {
    return this.reminderService.getReminder(key)
    .then(reminder => this.reminder = reminder);
  }
}
