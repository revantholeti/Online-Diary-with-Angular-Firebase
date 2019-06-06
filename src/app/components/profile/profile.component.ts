import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { passwordValidation } from 'src/app/shared/validation';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user:any;
  public imgUrl;
  public signinMethod:any
  public change:boolean=true;
  public updateusername:FormGroup;
  public changepassword:FormGroup;
  public errormessage:any;
  constructor(private service:LoginService,private fb:FormBuilder,private toaster:ToastrService) { }

  ngOnInit() {
    this.updateusername = this.fb.group({
      username:['',[Validators.required]]
    })
    this.changepassword = this.fb.group({
      oldpassword:['',[Validators.required]],
      password:['',[Validators.required]],
      confirm_pass:['']
    },{validators:passwordValidation})
    this.service.getusers().subscribe(
      (user)=>{
        this.user = user
        if(this.user.photoURL != null)
        this.imgUrl = this.user.photoURL
        else
        this.imgUrl = "../../../assets/images/default_profile_image.jpg"

        var loggeduser = firebase.auth().currentUser
        if(loggeduser!= null){
          loggeduser.providerData.map((value,index,userinformation)=>{
            this.signinMethod = userinformation[0].providerId
            if(this.signinMethod == 'password'){
              this.change = false;
            }
          })
        }
    })
    
  }
  
  onSubmitUsername(){
    var loggeduser = firebase.auth().currentUser
    loggeduser.updateProfile({
      displayName:this.updateusername.value.username
    }).then(()=>{
      this.toaster.success("Updated successfully")
    }).catch((error)=>{
      this.toaster.error(error);
    })
  }

  onSubmitPassword(){
    var loggeduser = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(loggeduser.email,this.changepassword.value.oldpassword)
    loggeduser.reauthenticateWithCredential(credential).then(
      (success)=>{
        loggeduser.updatePassword(this.changepassword.value.newpassword).then(
          ()=>{
            this.toaster.success("Password Updated successfully")
            this.changepassword.reset()
        }).catch((error)=>{
          console.log(error)
        })
    }).catch((error)=>{
      this.toaster.error(error.message)
      this.changepassword.reset()
    })
  }
  

}
