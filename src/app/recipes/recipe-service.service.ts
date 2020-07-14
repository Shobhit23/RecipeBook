import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  
  public recipes : Recipe[] = [];
  // = [
  //   new Recipe('Name A','Description A',
  //   'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',[
  //     new Ingredient("Meat A",1), new Ingredient("French Fries A",20)
  //   ]),
  //   new Recipe('Name B','Description B',
  //   'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',[
  //     new Ingredient("Meat B",1), new Ingredient("French Fries B",20)
  //   ]),
  //   new Recipe('Name C','Description C',
  //   'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',[
  //     new Ingredient("Meat C",1), new Ingredient("French Fries C",20)
  //   ]),
  //   new Recipe('Name D','Description D',
  //   'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2015/11/shakshuka-11.jpg',[
  //     new Ingredient("Meat D",1), new Ingredient("French Fries D",20)
  //   ])
  // ]
  ;

  recipesChanged = new BehaviorSubject<Recipe[]>(this.recipes);

  selectedRecipe = new EventEmitter<Recipe>();

  constructor() { }

  getRecipes(){
    return this.recipes.slice();
  }

}
