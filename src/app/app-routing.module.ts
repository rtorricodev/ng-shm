import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
// pages
import { HomePageComponent } from './pages/home-page/home-page.component';

// crud components medic documents
import { MedicDocumentAddComponent } from './crud components/medic-document/medic-document-add/medic-document-add.component';
import { MedicDocumentViewComponent } from './crud components/medic-document/medic-document-view/medic-document-view.component';
import { MedicDocumentEditComponent } from './crud components/medic-document/medic-document-edit/medic-document-edit.component';

//crud componetns reminder
import { ReminderAddComponent } from './crud components/reminder/reminder-add/reminder-add.component';
import { ReminderViewComponent } from './crud components/reminder/reminder-view/reminder-view.component';
import { ReminderEditComponent } from './crud components/reminder/reminder-edit/reminder-edit.component';
import { ReminderListComponent } from './crud components/reminder/reminder-list/reminder-list.component';

const routes: Routes = [
  // pages
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'register', component: RegisterPageComponent },
  {path: 'home', component: HomePageComponent},
  // crud components
  {path: 'add', component: MedicDocumentAddComponent},
  {path: 'view/:id', component: MedicDocumentViewComponent},
  {path: 'edit/:id', component: MedicDocumentEditComponent},
  //crud reminders
  {path: 'reminders', component: ReminderListComponent},
  {path: 'reminders/add', component: ReminderAddComponent},
  {path: 'reminders/view/:id', component: ReminderViewComponent},
  {path: 'reminders/edit/:id', component: ReminderEditComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
