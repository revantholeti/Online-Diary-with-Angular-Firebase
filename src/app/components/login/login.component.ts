import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user:FormGroup;

  public errormessage;
  constructor(private loginservice:LoginService,private afauth:AngularFireAuth,private route:Router,
    private activatedroute:ActivatedRoute,private fb:FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      email:[''],
      password:['']
    });
  }

  loginwithgoogle(){
    this.loginservice.googlelogin().then(()=>{
      this.afauth.authState.subscribe(auth=>{
        localStorage.setItem('token',auth.uid)
      })
      this.route.navigate(["../Home"],{relativeTo:this.activatedroute});
    });
  }

  logout(){
    this.loginservice.logout();
  }

  onSubmit(){
    console.log(this.user.value);
    this.loginservice.signinwithemail(this.user.value).then(
      res=>{
        this.afauth.authState.subscribe(auth=>localStorage.setItem('token',auth.uid))
        this.route.navigate(['../Home'],{relativeTo:this.activatedroute})
      },(error)=>{
        this.errormessage= error.message;
      });
  }

}
