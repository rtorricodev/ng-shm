import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
//pages
import { HomePageComponent } from './pages/home-page/home-page.component';

//crud components
import { MedicDocumentAddComponent } from './crud components/medic-document/medic-document-add/medic-document-add.component';
import { MedicDocumentViewComponent } from './crud components/medic-document/medic-document-view/medic-document-view.component';
import { MedicDocumentEditComponent } from './crud components/medic-document/medic-document-edit/medic-document-edit.component';


const routes: Routes = [
  //pages
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'register', component: RegisterPageComponent },
  {path: 'home', component: HomePageComponent},
  //crud components
  {path: 'add', component: MedicDocumentAddComponent},
  {path: 'view/:id', component:MedicDocumentViewComponent},
  {path: 'edit/:id', component:MedicDocumentEditComponent},

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
