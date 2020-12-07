import { Ingredient } from './ingredient';
import { RecipeIngredient } from './recipeingredient';

export interface Recipe {
    id?: number;
    name?: string;
    description?: string;
    applicationUserId?: string;
    recipeIngredients?: RecipeIngredient[];
}
