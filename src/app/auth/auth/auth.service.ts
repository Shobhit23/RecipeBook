import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { RecipeServiceService } from 'src/app/recipes/recipe-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user : BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http : HttpClient,
    private recipeService : RecipeServiceService,
    private router : Router) { }

  onSignUp(object : Object){
    const response =  this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCPSf5mEuOAd7jQgHRLEN8EdGQ0CmXosXY',
      {
        email : object['email'],
        password : object['password'],
        returnSecureToken : true
      }    
    )

    response.subscribe(data => {this.user.next(<any>data),
    this.autoLogout(data['expiresIn']*100),
    localStorage.setItem('currentUser',JSON.stringify(data))});

    return response;
  }

  onLogin(object : Object){
    const response =  this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCPSf5mEuOAd7jQgHRLEN8EdGQ0CmXosXY',
    {
      email : object['email'],
      password : object['password'],
      returnSecureToken : true
    })

    response.subscribe(data => {this.user.next(<any>data),
      this.autoLogout(data['expiresIn']*100),
      localStorage.setItem('currentUser',JSON.stringify(data))});
    
    return response;

  }

  autoLogin(){
    if(localStorage.getItem('currentUser')){
      this.user.next(JSON.parse(localStorage.getItem('currentUser')));
      this.autoLogout(JSON.parse(localStorage.getItem('currentUser'))['expiresIn']*1000);
    }
  }

  autoLogout(expirationDuration : number){
    setTimeout(() => {
      this.user.next(null);
      this.recipeService.recipes=[];
      this.recipeService.recipesChanged.next(null);
      this.recipeService.selectedRecipe.next(null);
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/auth');
    },expirationDuration);
    
  }

}
