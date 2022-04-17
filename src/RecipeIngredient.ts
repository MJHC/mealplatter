import { Macro } from "./Macro";
import { Ingredient } from "./Ingredient";

export class RecipeIngredient{
    ingredient: Ingredient;
    amount: number;
    unit: string;

    constructor(ingredient: Ingredient, amount: number, unit: string){
        this.ingredient = ingredient;
        this.amount = amount;
        this.unit = unit;
    }

    getMacros(): Macro{
        const macro = new Macro();
        macro.calories = this.ingredient.macros.calories * (this.amount / 100);
        macro.fat = this.ingredient.macros.fat * (this.amount / 100);
        macro.carbohydrates = this.ingredient.macros.carbohydrates * (this.amount / 100);
        macro.protein = this.ingredient.macros.protein * (this.amount / 100);
        return macro;
    }
}