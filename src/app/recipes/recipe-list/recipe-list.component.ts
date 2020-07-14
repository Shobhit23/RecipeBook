import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeServiceService } from '../recipe-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  emittedRecipe : Recipe;
  @Output() emitRecipeEvent = new EventEmitter<Recipe>();
  recipes : Recipe[];
  subscription : Subscription;

  constructor(private recipeService : RecipeServiceService) { }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      data => this.recipes = data
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
