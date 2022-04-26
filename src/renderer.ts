import { Ingredient } from "./model/Ingredient";
import { Macro } from "./model/Macro";
import { Recipe } from "./model/Recipe";
import { RecipeIngredient } from "./model/RecipeIngredient";

const table = new IngredientTable("ingredients", window.electronAPI.getIngredients());

const recipeIngredients: Map<string, RecipeIngredient> = new Map();


table.addTitleRow();
addRow();

const addIngredient = document.getElementById("add_ingredient") as HTMLButtonElement;
const createRecipe = document.getElementById("create_recipe") as HTMLButtonElement;
const calculateMacros = document.getElementById("calculate_macros") as HTMLButtonElement;
const macros = document.getElementById("macros") as HTMLParagraphElement;

addIngredient.addEventListener("click", () => {
    addRow();
});

createRecipe.addEventListener("click", () => {
    const recipeName = document.getElementById("recipe_name") as HTMLInputElement;
    const recipeDescription = document.getElementById("recipe_description") as HTMLInputElement;
    const portions = document.getElementById("portions") as HTMLInputElement;
    const riArray = Array.from(recipeIngredients.values());
    const recipe = new Recipe(recipeName.value, riArray, recipeDescription.value, parseInt(portions.value), getCategories());
    window.electronAPI.saveRecipe(recipe);
});

calculateMacros.addEventListener("click", () => {
    const macro = new Macro();
    let weight = 0;

    recipeIngredients.forEach((value, key) => {
        macro.calories += value.macros.calories;
        macro.fat += value.macros.fat;
        macro.carbohydrates += value.macros.carbohydrates;
        macro.protein += value.macros.protein;
        weight += value.amount;
    });

    macros.innerText = `Calories: ${Math.floor(macro.calories)} Fat: ${Math.floor(macro.fat)}g Carbohydrates: ${Math.floor(macro.carbohydrates)}g Protein: ${Math.floor(macro.protein)}g Weight: ${Math.floor(weight)}g`;
});


function getCategories(): string[] {
    const categories: string[] = [];
    [document.getElementById("breakfast") as HTMLInputElement,
    document.getElementById("lunch") as HTMLInputElement,
    document.getElementById("dinner") as HTMLInputElement,
    document.getElementById("snack") as HTMLInputElement].forEach(element => {
        if(element.checked){
            categories.push(element.value);
        }
    });
    return categories;
}


function addRow(){
    const row = table.addRow();
    const searchBox = row.cells[0].children[0] as HTMLInputElement;
    const amountInput = row.cells[1].children[0] as HTMLInputElement;
    const unitSelect = row.cells[2].children[0] as HTMLSelectElement;
    const updateBtn = row.cells[4].children[0] as HTMLButtonElement;

    updateBtn.addEventListener("click", () => {
        const ingredient = window.electronAPI.findIngredient(searchBox.value);
        const amount = amountInput.value;
        const unit = unitSelect.value;

        if(ingredient === undefined){
            alert("Ingredient not found");
            return;
        }

        const recipeIngredient = new RecipeIngredient(ingredient, Number(amount), unit);
        recipeIngredients.set(searchBox.id, recipeIngredient);
        console.log(ingredient);
    });
}