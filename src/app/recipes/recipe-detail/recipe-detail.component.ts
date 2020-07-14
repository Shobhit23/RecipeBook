import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListServiceService } from 'src/app/shopping-list/shopping-list-service.service';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeServiceService } from '../recipe-service.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe : Recipe;
  id : number = null;

  constructor(private shoppingListServiceService : ShoppingListServiceService,
              private router : ActivatedRoute,
              private recipeService : RecipeServiceService,
              private route : Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (params : Params) => {
        this.recipe = this.recipeService.getRecipes()[+params["id"]];
        this.id = params["id"];
      }
    )
  }

  over(){
      document.getElementById("ulDropdown").className="dropdown-menu show";
  }

  out(){
      document.getElementById("ulDropdown").className="dropdown-menu";
  }

  addIngredients(ingredients : Ingredient[]){
    ingredients.forEach(element => {
      this.shoppingListServiceService.addIngredient(element);
    });
  }

  onDelete(){
    this.recipeService.recipes.splice(this.id,1);
    console.log(this.recipeService.recipes);
    this.recipeService.recipesChanged.next(this.recipeService.recipes);
  }

}
