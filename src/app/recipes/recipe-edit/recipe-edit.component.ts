import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeServiceService } from '../recipe-service.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id : number = null;
  editMode = false;
  recipeForm : FormGroup;
  selectedRecipeIngredients : FormArray = new FormArray([]);
  selectedRecipe : Recipe;

  constructor(private router : ActivatedRoute,private recipeService : RecipeServiceService) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (params : Params) => {
        this.id = params["id"];
        this.editMode = params["id"]!=null;
      }
    );
    
    this.recipeService.recipesChanged.subscribe(
      data => this.selectedRecipe = data[this.id]
    )
    // this.selectedRecipe = this.recipeService.getRecipes()[this.id];
    
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    
    if(this.editMode){
      recipeName = this.selectedRecipe.name;
      recipeImagePath = this.selectedRecipe.imagePath;
      recipeDescription = this.selectedRecipe.description;

      if(this.selectedRecipe.ingredients){
        for(let ingredient of this.selectedRecipe.ingredients){
          this.selectedRecipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name,Validators.required),
              'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }

    }

    this.recipeForm = new FormGroup({
      recipeName : new FormControl(recipeName,Validators.required),
      url : new FormControl(recipeImagePath,Validators.required),
      description : new FormControl(recipeDescription,Validators.required),
      ingredients : this.selectedRecipeIngredients
    });
  }

  onSubmit(){
    if(this.editMode){
      this.recipeService.getRecipes()[this.id].name=this.recipeForm.value['recipeName'];
      this.recipeService.getRecipes()[this.id].description=this.recipeForm.value['description'];
      this.recipeService.getRecipes()[this.id].imagePath=this.recipeForm.value['url'];
      this.recipeService.getRecipes()[this.id].ingredients=this.recipeForm.value['ingredients'];
    }
    else{
      this.recipeService.recipes.push(
        new Recipe(this.recipeForm.value['recipeName'],
        this.recipeForm.value['description'],
        this.recipeForm.value['url'],
        this.recipeForm.value['ingredients'])
      );
      this.recipeService.recipesChanged.next(this.recipeService.getRecipes());
    }
  }

  onAddIngredient(){
    this.selectedRecipeIngredients.push(
      new FormGroup({
        'name' : new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  
  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
