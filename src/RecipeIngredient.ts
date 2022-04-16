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

    getCalories(): number{
        return this.ingredient.calories * (this.amount / 100);
    }

    getFat(): number{
        return this.ingredient.fat * (this.amount / 100);
    }

    getCarbohydrates(): number{
        return this.ingredient.carbohydrates * (this.amount / 100);
    }

    getProtein(): number{
        return this.ingredient.protein * (this.amount / 100);
    }
}