import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeServiceService } from './recipe-service.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  emittedRecipe : Recipe;

  constructor(private recipeService : RecipeServiceService) { }

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe(data => this.emittedRecipe=data)
  }

}
