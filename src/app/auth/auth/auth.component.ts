import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner/loading-spinner.component';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error = "";
  user : User = new User('','','',null);
  userSubject = new Subject<User>();

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(myForm : NgForm){
    this.error='';
    this.isLoading = true;
    if(this.isLoginMode){
      this.authService.onLogin(myForm.value).subscribe(
        data => {
          this.user.email=data['email'];
          this.user.id=data['localId'];
          this.user.setToken(data['idToken']);
          const expirationDate = new Date(new Date().getTime()+ +data['expiresIn']*1000);
          this.user.setTokenExpirationDate(expirationDate);
          console.log(this.user);
          console.log(data);
          this.userSubject.next(this.user);
          this.isLoading=false;
          this.router.navigateByUrl('/recipes');},
        error => {this.error = (error.error.error.message);this.isLoading=false}
      );
      myForm.reset();
    }
    else{
      this.authService.onSignUp(myForm.value).subscribe(
        data => {
          console.log(data);
          this.isLoading=false;
          this.user.email=data['email'];
          this.user.id=data['localId'];
          this.user.setToken(data['idToken']);
          const expirationDate = new Date(new Date().getTime()+ +data['expiresIn']*1000);
          this.user.setTokenExpirationDate(expirationDate);
          console.log(this.user);
          this.userSubject.next(this.user);
          this.router.navigateByUrl('/recipes');
        },
        error => {this.error = (error.error.error.message);this.isLoading=false}
      );
      myForm.reset();
    }
  }

}
