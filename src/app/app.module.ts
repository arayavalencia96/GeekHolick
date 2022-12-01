import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import firebase from 'firebase/compat/app';

import {provideAuth, getAuth} from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Componentes

import { AppComponent } from './app.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { NavdarComponent } from './components/navdar/navdar.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FilterPipe } from './pipes/filter.pipe';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SendEmailComponent } from './components/auth/send-email/send-email.component';

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    NavdarComponent,
    LoginComponent,
    RegistroComponent,
    ForgotPasswordComponent,
    HomeComponent,
    ErrorPageComponent,
    FooterComponent,
    ModalComponent,
    FilterPipe,
    SendEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    RouterModule,
    FormsModule,
  ],
  providers: [NavdarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
