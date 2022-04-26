import { Macro } from "./Macro";
import { Recipe } from "./Recipe";

export class MealPlan{
    recipes: Recipe[] = [];
    macros: Macro = new Macro();

    calculateMacros(){
        this.recipes.forEach(recipe => {
            this.macros.calories += recipe.macros.calories;
            this.macros.carbohydrates += recipe.macros.carbohydrates;
            this.macros.fat += recipe.macros.fat;
            this.macros.protein += recipe.macros.protein;
        });
    }
}