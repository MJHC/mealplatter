
import { convertRawFotexItem } from "./database/ingredientConverters/fotex";
import { convertRawRemaItem } from "./database/ingredientConverters/rema";
import { IFotexIngredient } from "./database/interfaces/IFotexIngredient";
import { IRemaIngredient } from "./database/interfaces/IRemaIngredient";
import { MealDatabase } from "./database/MealDatabase";

//convertValdemarIngredient("500g kød 500g, blend godt, eller noget");


const mealDB: MealDatabase = new MealDatabase("../../data/");

mealDB.fetchNewIngredientsFromFile("../../data/fotex/ingredients_raw.json", "Fotex", convertRawFotexItem,
(ingredient: IFotexIngredient) => ingredient.nutritionPer100g !== undefined
);

mealDB.fetchNewIngredientsFromFile("../../data/rema/ingredients_raw.json", "Rema", convertRawRemaItem,
(ingredient: IRemaIngredient) => ingredient.nutrition_info.length > 0
);