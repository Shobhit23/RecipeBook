import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesLoadedGuard } from './recipes-loaded.guard';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthGuardGuard } from './auth/auth/auth-guard.guard';


const routes: Routes = [
  {path : "", redirectTo : '/auth', pathMatch : 'full'},
  {path : "recipes", component : RecipesComponent,canActivate : [AuthGuardGuard], children :[
    {path : '', component : RecipeStartComponent},
    {path : 'new', component : RecipeEditComponent},
    {path : ':id', component : RecipeDetailComponent, canActivate : [RecipesLoadedGuard]},
    {path : ':id/edit', component : RecipeEditComponent, canActivate : [RecipesLoadedGuard]}
  ]},
  {path : "shopping-list", component : ShoppingListComponent,canActivate : [AuthGuardGuard]},
  {path : "auth", component : AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
