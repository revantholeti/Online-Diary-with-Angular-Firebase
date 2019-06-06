import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HomeComponent } from './components/home/home.component';
import { AuthguardGuard } from './authguard.guard';
import { LoginService } from './service/login.service';
import { RegisterComponent } from './components/register/register.component';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule, MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import { AuthGuard } from './guard/auth.guard';
import { DaydetailsComponent } from './components/daydetails/daydetails.component'
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DaydetailsComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatButtonModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRippleModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthguardGuard,LoginService,AuthGuard,MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
