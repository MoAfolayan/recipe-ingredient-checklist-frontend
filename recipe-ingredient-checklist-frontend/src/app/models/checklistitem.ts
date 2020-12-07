import { Ingredient } from './ingredient';

export interface CheckListItem {
    id?: number;
    checkListId?: number;
    ingredient?: Ingredient;
    checked?: boolean;
}
