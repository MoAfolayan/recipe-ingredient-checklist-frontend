import { Component } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { ChecklistService } from '../services/checklist/checklist.service';
import { UserService } from '../services/user/user.service';
import { RecipeService } from '../services/recipe/recipe.service';
import { Recipe } from '../models/recipe';
import { CheckList } from '../models/checklist';
import { MatSelectionListChange } from '@angular/material/list';
import { CheckListItem } from '../models/checklistitem';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private authService: AuthService,
    private checkListService: ChecklistService,
    private userService: UserService,
    private recipeService: RecipeService
  ) { }

  private activeCheckList: CheckList;

  private currentUser$ = this.userService.currentUser$
    .pipe(
      catchError(this.handleError)
    );

  private currentUserRecipes$ = this.recipeService.currentUserRecipes$
    .pipe(
      catchError(this.handleError)
    );

  private handleError(err: string): Observable<never> {
    console.error(err);
    return EMPTY;
  }

  private showCheckList(recipe: Recipe) {
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

  private onCheckListChange(change: MatSelectionListChange, list) {
    console.log(change.option.value, change.option.selected);

    if (list.selectedOptions.selected.length == list._keyManager._items.length) {
      console.log('true');
      this.checkListService.deactivateCheckList(change.option.value.checkListId)
        .subscribe(
          (data) => {
            if (data["deactivated"] == true) {
              alert('Check list complete');
              this.activeCheckList = null;
            }
          }
        );
    }

    let checkListItem: CheckListItem = {
      id: change.option.value.id,
      checked: change.option.selected
    }

    this.checkListService.updateCheckListItem(checkListItem)
      .subscribe(
        (data: CheckListItem) => this.activeCheckList.checkListItems[data.id].checked = data["checked"]
      );
  }

  private logout() {
    this.authService.logout();
  }

}
