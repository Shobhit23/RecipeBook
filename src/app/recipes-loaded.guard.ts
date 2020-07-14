import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeServiceService } from './recipes/recipe-service.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesLoadedGuard implements CanActivate {

  constructor(private recipeService : RecipeServiceService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!(this.recipeService.recipes.length>0)){
      return false;
    }
      return true;
  }
  
}
