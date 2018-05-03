import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//forms
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

//botstrap
import {AlertModule} from "ngx-bootstrap";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//page components
import { RegisterPageComponent } from './pages/register-page/register-page.component';

//components
import { RegisterUserComponent } from './components/register-user/register-user.component';

//services
import { AuthService } from './services/auth.service';

//firebase imports
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig , 'SHM web'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
