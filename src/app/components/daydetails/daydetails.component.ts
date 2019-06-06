import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { Upload } from 'src/app/shared/upload';
import { UploadService } from 'src/app/service/upload.service';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
@Component({
  selector: 'app-daydetails',
  templateUrl: './daydetails.component.html',
  styleUrls: ['./daydetails.component.css']
})
export class DaydetailsComponent implements OnInit {

  public user;
  public imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  uploadProgress$: Observable<number>;
  constructor(private userdetailservice:LoginService,private fb:FormBuilder,private afs:AngularFirestore,
    private toaster:ToastrService,private upSvc:UploadService,private storage:AngularFireStorage,private router:Router,private activatedroute:ActivatedRoute) { }
  public daydetails:FormGroup;
  ngOnInit() {
    this.userdetailservice.getusers().subscribe((data)=>{this.user = data})
    this.daydetails = this.fb.group({
      data:['',[Validators.required]],
      date:['',[Validators.required]],
      imageName : [null],
      uid:['']
    })
    this.imgSrc ='https://cdn1.iconfinder.com/data/icons/hawcons/32/698394-icon-130-cloud-upload-512.png'
  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.selectedImage = event.target.files[0];
      
    }
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.daydetails.valid){
      var basepath = 'daily_uploads'
      const date = new DatePipe('en-US').transform(this.daydetails.value.date, 'ddMMyyyy')
      this.daydetails.value.date = new DatePipe('en-US').transform(this.daydetails.value.date, 'dd/MM/yyyy')
      var uid = localStorage.getItem('token')
      if(this.selectedImage){
      var filepath = `${basepath}/${uid}-${date}`
      const fileRef = this.storage.ref(filepath)
      const task=this.storage.upload(filepath,this.selectedImage)
      this.uploadProgress$=task.percentageChanges()
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.daydetails.value.imageName = url;
            this.daydetails.value.uid = uid;
            this.upSvc.insertImageDetails(this.daydetails.value);
            this.toaster.success("Submitted successfully")
            this.router.navigate(['../Home'],{relativeTo:this.activatedroute})
          })
        }),
      ).subscribe()
    }    
    else{
      this.daydetails.value.uid = uid;
      this.upSvc.insertImageDetails(this.daydetails.value)
      this.toaster.success("Submitted successfully")
      this.router.navigate(['../Home'],{relativeTo:this.activatedroute})
    }
    }
  }

}
