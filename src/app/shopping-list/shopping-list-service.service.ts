import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListServiceService {

  editIngredient = new BehaviorSubject<number>(null);

  ingredients : Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ];

  constructor() { }

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
  }

}
