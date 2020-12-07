import { Ingredient } from './ingredient';

export interface RecipeIngredient {
    recipeId?: number;
    ingredientId?: number;
    ingredient: Ingredient;
}
