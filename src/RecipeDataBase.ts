import fs from 'fs';
import { Ingredient } from "./Ingredient";
import { MealPlan } from './MealPlan';
import { Recipe } from "./Recipe";

export class RecipeDataBase{
    ingredients: Ingredient[] = [];
    recipes: Recipe[] = [];
    

    loadRecipes(path: string){
        const data = fs.readFileSync(path, 'utf8');
        this.recipes = JSON.parse(data);
    }

    saveRecipes(path: string){
        const data = JSON.stringify(this.recipes);
        fs.writeFileSync(path, data);
    }

    findIngredient(name: string): Ingredient{
        const ingredient = this.ingredients.find(ingredient => 
            ingredient.name.toLowerCase() === name.toLowerCase());
        if(ingredient === undefined){
            const newIngredient = new Ingredient(name, 0, 0, 0, 0);
            this.ingredients.push(newIngredient);
            return newIngredient;
        }
        return ingredient;
    }

    getRecipe(name: string): Recipe{
        const recipe = this.recipes.find(recipe => 
            recipe.name.toLowerCase() === name.toLowerCase());
        if(recipe === undefined){
            throw new Error("Recipe not found");
        }
        return recipe;
    }

    generateMealPlan(mealsSplit: number, dailyCalories: number, dailyProtein: number, dailyCarbohydrates: number, dailyFat: number,){
        const MealPlan: MealPlan =
        const mealSplit = this.calculateMealSplit(dailyCalories, mealsSplit);
        const breakfastMeals = this.recipes.find(recipe => recipe.category.includes("Breakfast") && recipe.calories <= mealSplit[0]);
        const lunchMeals = this.recipes.find(recipe => recipe.category.includes("Lunch") && recipe.calories <= mealSplit[1]);
        const dinnerMeals = this.recipes.find(recipe => recipe.category.includes("Dinner") && recipe.calories <= mealSplit[2]);
        if(breakfastMeals && lunchMeals && dinnerMeals){
            
        }
    
    }

    calculateMealSplit(dailyCalories: number, meals: number): number[]{
        switch(meals){
            case 3:
                return [dailyCalories *0.325, dailyCalories*0.375, dailyCalories *0.3];
            case 4:
                return [dailyCalories *0.275, dailyCalories*0.07, dailyCalories *0.375, dailyCalories*0.275];
            case 5:
                return [dailyCalories *0.275, dailyCalories*0.07, dailyCalories *0.375, dailyCalories *0.07, dailyCalories*0.275];
        }
        return [dailyCalories *0.325, dailyCalories*0.375, dailyCalories *0.3];
    }
}
