import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
  constructor(private router:Router,private activatedRoute:ActivatedRoute) { }
  canActivate():boolean{
    if(!!localStorage.getItem('token')){
      return true;
    }
    this.router.navigate(['../']);
  }
  
}
