import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';
import { DaydetailsComponent } from './components/daydetails/daydetails.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login', component : LoginComponent},
  { path: 'register', component:RegisterComponent },
  { path: 'Home' , component : HomeComponent,canActivate:[AuthGuard]},
  { path: 'daysaver' , component : DaydetailsComponent ,canActivate:[AuthGuard]},
  { path: 'profile' , component : ProfileComponent , canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
