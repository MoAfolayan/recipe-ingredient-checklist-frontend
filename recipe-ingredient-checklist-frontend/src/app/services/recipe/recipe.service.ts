import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  currentUserRecipes: Recipe[];

  constructor(
    private http: HttpClient
  ) { }

  getRecipes() {
    return this.http.get(environment['apiBaseUrl'] + '/recipes');
  }
  
}
