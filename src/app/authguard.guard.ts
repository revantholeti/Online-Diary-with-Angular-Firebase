import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { LoginService } from './service/login.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private loginservice:LoginService,private router:Router,private activatedroute:ActivatedRoute){}
  canActivate():Observable<boolean>{
    return this.loginservice.getusers().pipe(map(auth => {
      if (auth) {
        return true;
      }
      this.router.navigate(['../'],{relativeTo:this.activatedroute});
    }));
  }
  
}
