import fs from 'fs';
import { Ingredient } from "./Ingredient";
import { MealPlan } from './MealPlan';
import { Recipe } from "./Recipe";

export class RecipeDataBase{
    ingredients: Ingredient[] = [];
    recipes: Recipe[] = [];
    

    loadIngredients(path: string){
        const json = fs.readFileSync(path, 'utf8');
        this.ingredients = JSON.parse(json);
    }

    loadRecipes(path: string){
        const data = fs.readFileSync(path, 'utf8');
        this.recipes = JSON.parse(data);
    }

    saveRecipes(path: string){
        const data = JSON.stringify(this.recipes);
        fs.writeFileSync(path, data);
    }

    findIngredient(name: string): Ingredient | undefined{
        const ingredient = this.ingredients.find(ingredient => ingredient.name.toLowerCase() === name.toLowerCase());
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

    removeRecipe(name: string){
        const index = this.recipes.findIndex(recipe => recipe.name.toLowerCase() === name.toLowerCase());
        if(index === -1){
            throw new Error("Recipe not found");
        }
        this.recipes.splice(index, 1);
        this.saveRecipes("./recipes.json");
    }
        

    getRecipes(): Recipe[]{
        return this.recipes;
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.saveRecipes("./recipes.json");
    }

    findRecipes(category: string): Recipe[]{
        return  this.recipes.filter(recipe => recipe.category.includes(category))
    }

    getRandomRecipeFromCategory(category: string): Recipe{
        const cat = this.findRecipes(category);
        const index = Math.floor(Math.random() * cat.length);
        return cat[index];
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
                const recipe = category[index];

                //Logic

                mealPlan.recipes.push(recipe);
            });
            mealPlan.calculateMacros();
            mealPlans.push(mealPlan);
        }
        return mealPlans
    }
}
