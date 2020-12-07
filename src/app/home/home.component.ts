import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ChecklistService } from '../services/checklist/checklist.service';
import { UserService } from '../services/user/user.service';
import { RecipeService } from '../services/recipe/recipe.service';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { CheckList } from '../models/checklist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  recipes: Recipe[];
  activeCheckList: CheckList;

  constructor(
    private authService: AuthService,
    private checkListService: ChecklistService,
    private userService: UserService,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.userService.getUser()
      .subscribe(
        (data: User) => this.currentUser = { ...data }
      );

    this.recipeService.getRecipes()
      .subscribe(
        (data) => this.recipes = data["recipes"]
      );
  }

  toggleCheckList(recipe: Recipe) {
    this.checkListService.getActiveCheckList(recipe.id)
      .subscribe(
        (data) => this.activeCheckList = data
      );
  }

  logout() {
    this.authService.logout();
  }

}
