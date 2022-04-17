import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";
import { RecipeDataBase } from "./RecipeDataBase";
import { RecipeIngredient } from "./RecipeIngredient";


const database = new RecipeDataBase();

database.ingredients.push(new Ingredient("Tomato", 0,25, 1, 8, 2));
database.ingredients.push(new Ingredient("Flour", 0,123, 3, 50, 8));
database.ingredients.push(new Ingredient("Water", 0,0, 0, 0, 0));
database.ingredients.push(new Ingredient("Salt", 0,0, 0, 0, 0));
database.ingredients.push(new Ingredient("Yeast", 0,2, 2, 2, 2));
database.ingredients.push(new Ingredient("Cheese", 0,100, 10, 10, 10));
database.ingredients.push(new Ingredient("Ground Beef", 0,136, 12, 0, 21));
database.ingredients.push(new Ingredient("Onion", 0,76, 2, 40, 1));
database.ingredients.push(new Ingredient("Garlic", 0,43, 2, 20, 0));
database.ingredients.push(new Ingredient("Pepper", 0,80, 3, 2, 1));
database.ingredients.push(new Ingredient("Pasta", 0,100, 10, 10, 10));
database.ingredients.push(new Ingredient("Oats", 0,136, 5, 60, 13));


database.recipes.push(new Recipe("Pizza", [
    new RecipeIngredient(database.findIngredient("Tomato"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Flour"), 300, "g"),
    new RecipeIngredient(database.findIngredient("Water"), 150, "g"),
    new RecipeIngredient(database.findIngredient("Salt"), 5, "g"),
    new RecipeIngredient(database.findIngredient("Yeast"), 25, "g"),
    new RecipeIngredient(database.findIngredient("Cheese"), 100, "g")
], "This is a pizza", ["Dinner", "Lunch"]));

database.recipes.push(new Recipe("Bread", [
    new RecipeIngredient(database.findIngredient("Flour"), 300, "g"),
    new RecipeIngredient(database.findIngredient("Water"), 150, "g"),
    new RecipeIngredient(database.findIngredient("Salt"), 5, "g"),
    new RecipeIngredient(database.findIngredient("Yeast"), 25, "g"),
], "Bread Recipe", ["Dinner", "Lunch", "Breakfast"]));

database.recipes.push(new Recipe("Spaghetti Bolognese", [
    new RecipeIngredient(database.findIngredient("Ground Beef"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Onion"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Garlic"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Pepper"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Pasta"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Water"), 100, "g")
], "Spaghetti Bolognese Recipe", ["Dinner", "Lunch"]));

database.recipes.push(new Recipe("Oatmeal", [
    new RecipeIngredient(database.findIngredient("Water"), 100, "g"),
    new RecipeIngredient(database.findIngredient("Oats"), 100, "g")
], "Oatmeal Recipe", ["Breakfast"]));

database.recipes.push(new Recipe("Ryebread with cheese",[
    new RecipeIngredient(database.findIngredient("Ryebread"), 150, "g"),
    new RecipeIngredient(database.findIngredient("Cheese"), 100, "g")
], "Ryebread with cheese Recipe", ["Lunch"]));


const weekPlan = database.generateMealPlan();

console.table(weekPlan[0].macros);