import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListServiceService } from '../shopping-list-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  // nameInput : string = "";
  // amountInput : number = null;
  ingredient : Ingredient
  @ViewChild("f") myForm : NgForm = new NgForm(null,null);
  editMode : boolean = false;
  editItemIndex : number = null;

  constructor(private shoppingListServiceService : ShoppingListServiceService) { }

  ngOnInit(): void {
    this.shoppingListServiceService.editIngredient.
    subscribe(data => {
      if(data!=null && this.myForm.controls['nameInput'] && this.myForm.controls['amountInput']){
          this.myForm.setValue({
            nameInput : this.shoppingListServiceService.ingredients[data].name,
            amountInput : this.shoppingListServiceService.ingredients[data].amount,
          });
        this.editMode = true;
      }
    }
    )
  }

  add(myForm : NgForm){
    this.ingredient = new Ingredient(myForm.value.nameInput,myForm.value.amountInput);
    if(this.editMode==false){
      this.shoppingListServiceService.addIngredient(this.ingredient);
    }
    else{
      this.shoppingListServiceService.editIngredient
      .subscribe(data => this.editItemIndex = data);
      this.shoppingListServiceService.ingredients[this.editItemIndex] = this.ingredient;
    }
    this.editMode = false;
    this.myForm.reset();
  }

  onClear(){
    this.myForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.shoppingListServiceService.editIngredient
    .subscribe(data => this.editItemIndex = data);
    this.shoppingListServiceService.ingredients.splice(this.editItemIndex,1);
    this.editMode=false;
    this.myForm.reset();
  }

}
