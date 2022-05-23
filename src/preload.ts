import { contextBridge } from 'electron';
import * as os from 'os';
import { RecipeDataBase } from './data/RecipeDataBase';
import * as path from 'path'
import { Recipe } from './model/Recipe';

const db = new RecipeDataBase();
db.loadIngredients(path.join(__dirname, '../data/ingredients.json'));
db.loadRecipes(path.join(__dirname, '../data/recipes.json'));

contextBridge.exposeInMainWorld('electronAPI', {
    getCPUCores: () => os.cpus()[0].model,
    getIngredients: () => db.ingredients.map(i => i.name),
    findIngredient: (name: string) => db.findIngredient(name),
    saveRecipe: (recipe: Recipe) => db.addRecipe(recipe),
    getRecipes: () => db.getRecipes(),
    removeRecipe:(name: string) => db.removeRecipe(name),
});
  