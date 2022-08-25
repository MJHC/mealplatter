import { Ref } from "../model/Ref";

export class ErrorCollection {
    IngredientErros: Ref[];
    RecipeErrors: Ref[];

    constructor(ingredientErrors: Ref[], recipeErrors: Ref[]) {
        this.IngredientErros = ingredientErrors;
        this.RecipeErrors = recipeErrors;
    }
}