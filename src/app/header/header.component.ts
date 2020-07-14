import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Route, Router } from '@angular/router';
import { DataStorageService } from '../data-storage.service';
import { AuthService } from '../auth/auth/auth.service';
import { User } from '../auth/auth/user.model';
import { RecipeServiceService } from '../recipes/recipe-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  @Output() toPageEmitter = new EventEmitter<string>();

  constructor(private router : Router,
     private dataStorage : DataStorageService,
     private authService : AuthService,
     private recipeService : RecipeServiceService) { }

  ngOnDestroy(): void {
    this.authService.user.unsubscribe();
  }

  user : User;
  
  ngOnInit(): void {
    this.authService.user.subscribe(
      data => this.user=data
    )
  }

  over(){
    document.getElementById("ulHeaderDropdown").className="dropdown-menu dropdown-menu-right show";
    document.getElementById("navbarDropdown").style.backgroundColor="lightgray";
  }

  out(){
      document.getElementById("ulHeaderDropdown").className="dropdown-menu dropdown-menu-right";
      document.getElementById("navbarDropdown").style.backgroundColor="#f8f9fa";
  }

  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData(){
    this.dataStorage.fetchRecipes();
  }

  onLogout(){
    this.authService.user.next(null);
    this.recipeService.recipes=[];
    this.recipeService.recipesChanged.next(null);
    this.recipeService.selectedRecipe.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/auth');
  }

}
