import { Macro } from "./Macro";
import { RecipeIngredient } from "./RecipeIngredient";
import { Ref } from "./Ref";

export class Recipe {
    name: string;
    recipeIngredients: RecipeIngredient[];
    description: string;
    portions: number;
    category: string[];
    ref: Ref;

    macros: Macro = new Macro();

    constructor(name: string, ingredients: RecipeIngredient[], description: string, portions: number, category: string[], ref: Ref) {
        this.name = name;
        this.recipeIngredients = ingredients;
        this.description = description;
        this.portions = portions;
        this.category = category;
        this.ref = ref;
        
        for(let i = 0; i < this.recipeIngredients.length; i++){
            this.macros.calories += this.recipeIngredients[i].macros.calories;
            this.macros.fat += this.recipeIngredients[i].macros.fat;
            this.macros.carbohydrates += this.recipeIngredients[i].macros.carbohydrates;
            this.macros.protein += this.recipeIngredients[i].macros.protein;
        }
    }

    ToString(): string {
        return `${this.name} - ${this.recipeIngredients.length} ingredients - ${Math.floor(this.macros.calories)} calories - ${Math.floor(this.macros.fat)}g fat - ${Math.floor(this.macros.carbohydrates)}g carbs - ${Math.floor(this.macros.protein)}g protein`;
    }
}