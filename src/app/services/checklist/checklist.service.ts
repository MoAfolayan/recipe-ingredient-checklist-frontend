import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CheckListItem } from 'src/app/models/checklistitem';
import { Recipe } from 'src/app/models/recipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(
    private http: HttpClient
  ) { }

  getActiveCheckList(recipeId: number): Observable<Object> {
    return this.http.get(environment['apiBaseUrl'] + '/checklist/' + recipeId);
  }

  updateCheckListItem(checkListItem: CheckListItem): Observable<CheckListItem> {
    return this.http.post<CheckListItem>(environment['apiBaseUrl'] + '/checklist/updatechecklistitemstatus/', checkListItem);
  }

  deactivateCheckList(checkListId: number): Observable<Object> {
    const data = {
      'id': checkListId
    };
    return this.http.post(environment['apiBaseUrl'] + '/checklist/deactivate', data);
  }

  addNewCheckList(recipe: Recipe): Observable<Object> {
    const data = {
      'recipeId': recipe.id,
    };
    return this.http.put(environment['apiBaseUrl'] + '/checklist', data);
  }
}
