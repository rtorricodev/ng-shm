import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// forms
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

// botstrap
import {AlertModule} from 'ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// page components
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

// components
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';

// crud components
import { MedicDocumentListComponent } from './crud components/medic-document/medic-document-list/medic-document-list.component';
import { MedicDocumentFormComponent } from './crud components/medic-document/medic-document-form/medic-document-form.component';
import { MedicDocumentViewComponent } from './crud components/medic-document/medic-document-view/medic-document-view.component';
import { MedicDocumentAddComponent } from './crud components/medic-document/medic-document-add/medic-document-add.component';
import { MedicDocumentEditComponent } from './crud components/medic-document/medic-document-edit/medic-document-edit.component';

// crud components services
import { medicDocumentService } from './services/medic.document.service';

// services
import { AuthService } from './services/auth.service';

// firebase imports
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


@NgModule({
  declarations: [
    // components
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    DisplayUserComponent,
    // pagecomponents
    RegisterPageComponent,
    HomePageComponent,
    // crud
    MedicDocumentListComponent,
    MedicDocumentFormComponent,
    MedicDocumentAddComponent,
    MedicDocumentViewComponent,
    MedicDocumentEditComponent
  ],

  imports: [
    // angular modules
    BrowserModule,
    AppRoutingModule,
    // forms
    FormsModule,
    ReactiveFormsModule,
    // bootstrap
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    // firebase
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],

  providers: [
    AuthService,
    medicDocumentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
