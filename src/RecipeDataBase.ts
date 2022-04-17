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
            const newIngredient = Ingredient.createSample(name);
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

    findRecipes(category: string): Recipe[]{
        return  this.recipes.filter(recipe => recipe.category.includes(category))
    }

    generateMealPlan(): MealPlan[]{
        const breakfast = this.findRecipes("Breakfast");
        const lunch = this.findRecipes("Lunch");
        const dinner = this.findRecipes("Dinner");
        const recipes = [breakfast, lunch, dinner];
        const mealPlans = []
        for(let i = 0; i < 7; i++){
            const mealPlan = new MealPlan();
            recipes.forEach(category => {
                const index = Math.floor(Math.random() * category.length);
                mealPlan.recipes.push(category[index]);
            });
            mealPlan.calculateMacros();
            mealPlans.push(mealPlan);
        }
        return mealPlans
    }
}
