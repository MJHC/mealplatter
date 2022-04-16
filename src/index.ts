import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";
import { RecipeDataBase } from "./RecipeDataBase";
import { RecipeIngredient } from "./RecipeIngredient";


const database = new RecipeDataBase();

database.ingredients.push(new Ingredient("Tomato", 25, 1, 8, 2));
database.ingredients.push(new Ingredient("Flour", 123, 3, 50, 8));
database.ingredients.push(new Ingredient("Water", 0, 0, 0, 0));
database.ingredients.push(new Ingredient("Salt", 0, 0, 0, 0));
database.ingredients.push(new Ingredient("Yeast", 2, 2, 2, 2));
database.ingredients.push(new Ingredient("Cheese", 100, 10, 10, 10));
database.ingredients.push(new Ingredient("Ground Beef", 136, 12, 0, 21));
database.ingredients.push(new Ingredient("Onion", 76, 2, 40, 1));
database.ingredients.push(new Ingredient("Garlic", 43, 2, 20, 0));
database.ingredients.push(new Ingredient("Pepper", 80, 3, 2, 1));
database.ingredients.push(new Ingredient("Pasta", 100, 10, 10, 10));
database.ingredients.push(new Ingredient("Oats", 136, 5, 60, 13));


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


const pizza = database.getRecipe("pizza");
console.log(pizza.name);
console.log(pizza.getCalories());
console.log(pizza.getFat());
console.log(pizza.getCarbohydrates());
console.log(pizza.getProtein());
