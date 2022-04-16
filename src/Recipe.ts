import { RecipeIngredient } from "./RecipeIngredient";

export class Recipe {
    name: string;
    recipeIngredients: RecipeIngredient[];
    description: string;
    category: string[];

    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;

    constructor(name: string, ingredients: RecipeIngredient[], description: string, category: string[]) {
        this.name = name;
        this.recipeIngredients = ingredients;
        this.description = description;
        this.category = category;
        
        this.calories = this.getCalories();
        this.fat = this.getFat();
        this.carbohydrates = this.getCarbohydrates();
        this.protein = this.getProtein();
    }


    getCalories(): number {
        let calories = 0;
        for (let i = 0; i < this.recipeIngredients.length; i++) {
            calories += this.recipeIngredients[i].getCalories();
        }
        return calories;
    }

    getFat(): number {
        let fat = 0;
        for (let i = 0; i < this.recipeIngredients.length; i++) {
            fat += this.recipeIngredients[i].getFat();
        }
        return fat;
    }

    getCarbohydrates(): number {
        let carbohydrates = 0;
        for (let i = 0; i < this.recipeIngredients.length; i++) {
            carbohydrates += this.recipeIngredients[i].getCarbohydrates();
        }
        return carbohydrates;
    }

    getProtein(): number {
        let protein = 0;
        for (let i = 0; i < this.recipeIngredients.length; i++) {
            protein += this.recipeIngredients[i].getProtein();
        }
        return protein;
    }
}