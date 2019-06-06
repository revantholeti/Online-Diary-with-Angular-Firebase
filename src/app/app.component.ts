import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from './service/login.service'
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public user = null;
  public marge = 5;
  constructor(private loginservice:LoginService,private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.loginservice.getusers().subscribe(auth=>this.user=auth);
  }
  
  public opened=false;
  navtoggle(){
    this.opened=!this.opened;
  }

  logout(){
    this.loginservice.logout();
    this.router.navigate(['']);
  }

  navigatetoProfile(){
    this.router.navigate(['../profile'],{relativeTo:this.activatedRoute})
  }



}
