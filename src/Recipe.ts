import { Macro } from "./Macro";
import { RecipeIngredient } from "./RecipeIngredient";

export class Recipe {
    name: string;
    recipeIngredients: RecipeIngredient[];
    description: string;
    category: string[];

    macros: Macro = new Macro();

    constructor(name: string, ingredients: RecipeIngredient[], description: string, category: string[]) {
        this.name = name;
        this.recipeIngredients = ingredients;
        this.description = description;
        this.category = category;
        
        for(let i = 0; i < this.recipeIngredients.length; i++){
            this.macros.calories += this.recipeIngredients[i].macros.calories;
            this.macros.fat += this.recipeIngredients[i].macros.fat;
            this.macros.carbohydrates += this.recipeIngredients[i].macros.carbohydrates;
            this.macros.protein += this.recipeIngredients[i].macros.protein;
        }
    }
}