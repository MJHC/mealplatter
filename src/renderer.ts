import { createButton, createRow, createTable, insertAfter } from "./model/frontend/Elementor";
import { RecipeCreator } from "./model/frontend/RecipeCreator";

// TODO: Do not write shit code

const recipes = window.electronAPI.getRecipes();

const list = document.getElementById("recipes_list") as HTMLParagraphElement;
const table = createTable(["Name", "Ingredients", "Calories", "Fat", "Carbs", "Protein"], "recipes");

insertAfter(table, list);

const recipeCreator = new RecipeCreator(table);

recipes.forEach(recipe => {
    const btn = createButton("Delete");
    const row = createRow([
        recipe.name, 
        recipe.recipeIngredients.length, 
        recipe.macros.calories, 
        recipe.macros.fat, 
        recipe.macros.carbohydrates, 
        recipe.macros.protein,
        btn
    ]);

    btn.addEventListener("click", () => {
        window.electronAPI.removeRecipe(recipe.name);
        row.remove();
    });

    table.appendChild(row);
});