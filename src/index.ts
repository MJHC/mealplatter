import { Database } from "./Database";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./Recipe";
import { RecipeDataBase } from "./RecipeDataBase";
import { RecipeIngredient } from "./RecipeIngredient";
import { APIReader } from "./APIReader";
import { ExcelReader } from "./ExcelReader";

const database = new RecipeDataBase();
database.loadIngredients("./ingredients.json");

database.findIngredient("Hvedemel").forEach(ingredient => {
    console.log(ingredient.name);
    console.table(ingredient.macros);
    console.log(ingredient.category);
    console.log("------------------");
});

//const weekPlan = database.generateMealPlan();

//console.table(weekPlan[0].macros);

//APIReader.calorieNinjaReader("tOmato, potato");