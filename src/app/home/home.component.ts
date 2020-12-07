import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ChecklistService } from '../services/checklist/checklist.service';
import { UserService } from '../services/user/user.service';
import { RecipeService } from '../services/recipe/recipe.service';
import { User } from '../models/user';
import { Recipe } from '../models/recipe';
import { CheckList } from '../models/checklist';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { SelectionModel } from '@angular/cdk/collections';
import { CheckListItem } from '../models/checklistitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  recipes: Recipe[];
  activeCheckList: CheckList;
  activeCheckListSelectedOptions: SelectionModel<MatListOption>;

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

  showCheckList(recipe: Recipe) {
    this.checkListService.getActiveCheckList(recipe.id)
      .subscribe(
        (data) => { 
          if (data) {
            this.activeCheckList = data
          } else {
            this.checkListService.addNewCheckList(recipe)
              .subscribe(
                (data2) => {
                  if (data2) {
                    alert('New checkList created');
                    this.activeCheckList = data
                  } else {
                    alert('Error creating new check list');
                  }
                }
              );
          }
        }
      );
  }

  onCheckListChange(change: MatSelectionListChange) {
    console.log(change.option.value, change.option.selected);
    var checkListItem: CheckListItem = {
      id: change.option.value.id,
      checked: change.option.selected
    }

    this.checkListService.updateCheckListItem(checkListItem)
      .subscribe(
        (data: CheckListItem) => this.activeCheckList.checkListItems[data.id].checked = data["checked"]
      );
  }

  logout() {
    this.authService.logout();
  }

}
