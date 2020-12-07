import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CheckList } from 'src/app/models/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  currentCheckList: CheckList;

  constructor(
    private http: HttpClient
  ) { }

  getActiveCheckList(recipeId: number) {
    return this.http.get(environment['apiBaseUrl'] + '/checklist/' + recipeId);
  }
}
