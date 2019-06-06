import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidation } from '../../shared/validation'
import { LoginService } from 'src/app/service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registration:FormGroup;
  public message=null;
  constructor(private afauth:AngularFireAuth,private fb:FormBuilder,private loginservice:LoginService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.registration=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      confirm_pass:['',Validators.required]
    },{validators:passwordValidation});
  }

  get email(){
    return this.registration.get('email');
  }

  onSubmit(){
    this.loginservice.createuser(this.registration.value).then(
      (res)=>{
      this.afauth.authState.subscribe(
        (auth)=>{
          localStorage.setItem('token',auth.uid)
        })
        this.router.navigate(['../Home'],{relativeTo:this.activatedRoute})
      },
      (error)=>{
        this.message = error.message;
      }
    ).catch((error)=>{
      console.log(error);
      this.message = error.message;
    })
  }

}
