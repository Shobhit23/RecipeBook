import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListServiceService } from './shopping-list-service.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : Ingredient[] = [];

  constructor(private shoppingListServiceService : ShoppingListServiceService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListServiceService.ingredients;
  }

  onEditItem(index : number){
    this.shoppingListServiceService.editIngredient.next(index);
    console.log(index);
  }

}
