import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CheckListItem } from 'src/app/models/checklistitem';
import { Recipe } from 'src/app/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(
    private http: HttpClient
  ) { }

  getActiveCheckList(recipeId: number) {
    return this.http.get(environment['apiBaseUrl'] + '/checklist/' + recipeId);
  }

  updateCheckListItem(checkListItem: CheckListItem) {
    return this.http.post<CheckListItem>(environment['apiBaseUrl'] + '/checklist/updatechecklistitemstatus/', checkListItem);
  }

  addNewCheckList(recipe: Recipe) {
    const data  = {
      'recipeId' : recipe.id,
    };
    return this.http.put(environment['apiBaseUrl'] + '/checklist', data);
  }
}
