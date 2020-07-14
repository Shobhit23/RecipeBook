import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from './recipes/recipe.model';
import { RecipeServiceService } from './recipes/recipe-service.service';
import { AuthService } from './auth/auth/auth.service';
import { User } from './auth/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  user : User;

  constructor(private http : HttpClient, private recipeService : RecipeServiceService,
    private authService : AuthService) { }

  storeRecipes(){
    this.authService.user.subscribe(
      data => this.user=data
    )
    this.http.put('https://ng-course-recipe-book-df199.firebaseio.com/recipes.json',
    this.recipeService.getRecipes(),
    {
      params: new HttpParams().set('auth',this.user['idToken'])
    }
    ).
    subscribe(data => console.log(data))
  }

  fetchRecipes(){
    this.authService.user.subscribe(
      data => this.user=data
    )
    this.http.get('https://ng-course-recipe-book-df199.firebaseio.com/recipes.json',
    {
      params: new HttpParams().set('auth',this.user['idToken'])
    }
    ).
    subscribe(data => {this.recipeService.recipesChanged.next(<any>data);this.recipeService.recipes=<any>data})
  }
}
