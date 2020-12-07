import { CheckListItem } from './checklistitem';

export interface CheckList {
    id?: number;
    recipeId?: number;
    isActive?: boolean;
    checkListItems?: CheckListItem[];
}
