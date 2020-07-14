import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  user : User;

  constructor(private authService : AuthService,
    private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.authService.user.subscribe(
        data => this.user=data
      )

    if(this.user){
      return true;
    }
    this.router.navigateByUrl('/auth');
    return false;
  
      }
    }
