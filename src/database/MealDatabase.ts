import * as fs from 'fs';
import path from 'path';
import { Ingredient } from "../model/Ingredient";
import { Recipe } from "../model/Recipe";
import { Ref } from '../model/Ref';
import { Collection } from "./Collection";
import { ErrorCollection } from "./ErrorCollection";
import { IngredientFetcher } from "./IngreidentFetcher";

export class MealDatabase{
    private dataFolderPath: string;

    private ingredients: Collection<Ingredient>;
    private recipes: Collection<Recipe>;

    private ingredientFetcher: IngredientFetcher;

    constructor(dataFolderPath: string){

        this.dataFolderPath = dataFolderPath;
        this.ingredients = new Collection<Ingredient>("ingredient", dataFolderPath + "ingredients.json", dataFolderPath + "i_errors.json");
        this.recipes = new Collection<Recipe>("recipe", dataFolderPath + "recipes.json", dataFolderPath + "r_errors.json");
        // TODO: add ingredient fetcher API KEYS
        this.ingredientFetcher = new IngredientFetcher([]);
    }

    fetchNewIngredientsFromFile(filePath: string, refName: string, venderConverter: Function, predicate: Function){
        let data = this.ingredientFetcher.fetchFromFile(filePath, refName, venderConverter, predicate);
        
        let dItems = 0;
        for (const item of data.items){
            dItems += this.insertIngredient(item);
        }
        
        let dErrors = 0;
        for (const error of data.errors){
            dErrors += this.insertError(error);
        }

        this.save<Ingredient>(this.dataFolderPath + "ingredients.json", this.ingredients.items);
        this.save<Ref>(this.dataFolderPath + "i_errors.json", this.ingredients.errors);


    }

    private save<T>(filePath: string, data: T[]){
        let absPath = path.join(__dirname, filePath);
        fs.writeFileSync(absPath, JSON.stringify(data));
    }

    private insertError(error: Ref){
        if (this.ingredients.errors.find(e => e.id == error.id))
            return 1;
        this.ingredients.errors.push(error);
        return 0;
    }

    insertIngredient(ingredient: Ingredient){
        if (this.ingredients.items.find(i => i.ref.id === ingredient.ref.id))
            return 1;
        this.ingredients.items.push(ingredient);
        return 0;
    }

    insertRecipe(recipe: Recipe){
        let re = this.recipes.items.find(i => i.ref.id === recipe.ref.id);

        if (re === undefined)
            this.recipes.items.push(recipe);
    }

    updateIngredient(ingredient: Ingredient){
        let ing = this.ingredients.items.find(i => i.ref.id === ingredient.ref.id);
    
        if (ing !== undefined){
            let index = this.ingredients.items.indexOf(ing)
            this.ingredients.items[index] = ingredient;
        }else{
            this.ingredients.items.push(ingredient);
        }
    }

    updateRecipe(recipe: Recipe){
        let re = this.recipes.items.find(i => i.ref.id === recipe.ref.id);

        if (re !== undefined){
            let index = this.recipes.items.indexOf(re)
            this.recipes.items[index] = recipe;
        }else{
            this.recipes.items.push(recipe);
        }
    }

    getIngredients(itemNames: string[]): Ingredient[]{
        let items: Ingredient[] = [];
        for (const name in itemNames){
            let item = this.ingredients.items.filter(i => i.name.includes(name));
            items = items.concat(item);
        }
        return items
    }

    getRecipes(itemNames: string[]): Recipe[]{
        let items: Recipe[] = [];
        for (const name in itemNames){
            let item = this.recipes.items.filter(i => i.name.includes(name));
            items = items.concat(item);
        }
        return items
    }

    getAllIngredients(): Ingredient[]{
        return this.ingredients.items;
    }

    getAllRecipes(): Recipe[]{
        return this.recipes.items;
    }

    getErrors(): ErrorCollection{
        return new ErrorCollection(this.ingredients.errors, this.recipes.errors);
    }
}

