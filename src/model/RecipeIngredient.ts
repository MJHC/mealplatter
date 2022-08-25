import { Macro } from "./Macro";
import { Ingredient } from "./Ingredient";

export class RecipeIngredient{
    ingredient: Ingredient;
    instruction: string;
    amount: number;
    unit: string;

    constructor(ingredient: Ingredient, instruction: string, amount: number, unit: string){
        this.ingredient = ingredient;
        this.instruction = instruction;
        this.amount = amount;
        this.unit = unit;
    }

    get macros(): Macro{
        const macro = new Macro();
        macro.calories = Math.floor(this.ingredient.macros.calories * (this.amount / 100));
        macro.fat = Math.floor(this.ingredient.macros.fat * (this.amount / 100));
        macro.carbohydrates = Math.floor(this.ingredient.macros.carbohydrates * (this.amount / 100));
        macro.protein = Math.floor(this.ingredient.macros.protein * (this.amount / 100));
        return macro;
    }

    get price(): number{
        return Math.round(((this.ingredient.priceKg / 1000) * this.amount) * 2) / 2;
    }
}