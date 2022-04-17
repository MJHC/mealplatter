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
            this.macros.calories += this.recipeIngredients[i].getMacros().calories;
            this.macros.fat += this.recipeIngredients[i].getMacros().fat;
            this.macros.carbohydrates += this.recipeIngredients[i].getMacros().carbohydrates;
            this.macros.protein += this.recipeIngredients[i].getMacros().protein;
        }
    }
}