import { Macro } from "../Macro";
import { Recipe } from "../Recipe";
import { IngredientTable } from "./IngredientTable";
import { createButton, createRow } from "./Elementor";

export class RecipeCreator{
    NameInput = document.getElementById("recipe_name") as HTMLInputElement;
    addIngredientBtn = document.getElementById("add_ingredient") as HTMLButtonElement;
    DescInput = document.getElementById("recipe_description") as HTMLInputElement;
    createBtn = document.getElementById("create_recipe") as HTMLButtonElement;
    calcMacrosBtn = document.getElementById("calculate_macros") as HTMLButtonElement;
    portionsInput = document.getElementById("portions") as HTMLInputElement;
    recipeList = document.getElementById("recipe_list") as HTMLUListElement;
    checkboxes = [
        document.getElementById("breakfast") as HTMLInputElement,
        document.getElementById("lunch") as HTMLInputElement,
        document.getElementById("dinner") as HTMLInputElement,
        document.getElementById("snack") as HTMLInputElement
    ];
    table = new IngredientTable("ingredients");

    constructor(table: HTMLTableElement){
        this.addIngredientBtn.addEventListener("click", () => this.table.addRow());

        this.createBtn.addEventListener("click", () => {
            const riArray = Array.from(this.table.recipeIngredients.values());
            const recipe = new Recipe(
                this.NameInput.value, 
                riArray, 
                this.DescInput.value, 
                parseInt(this.portionsInput.value), 
                this.getCategories()
                );
            window.electronAPI.saveRecipe(recipe);

            // test -------------------------------------------------
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

            // test -------------------------------------------------
        
            table.appendChild(row);

            this.clear();
        });

        this.calcMacrosBtn.addEventListener("click", () => {
            const macros = document.getElementById("macros") as HTMLParagraphElement;
            const macro = new Macro();
            let weight = 0;
            let price = 0;
        
            this.table.recipeIngredients.forEach((value, key) => {
                macro.calories += value.macros.calories;
                macro.fat += value.macros.fat;
                macro.carbohydrates += value.macros.carbohydrates;
                macro.protein += value.macros.protein;
                weight += value.amount;
                price += value.price;
            });
        
            macros.innerText = `Calories: ${macro.calories} - 
                                Fat: ${macro.fat}g - 
                                Carbohydrates: ${macro.carbohydrates}g - 
                                Protein: ${macro.protein}g - 
                                Weight: ${weight}g - 
                                Price ${price} kr.`;
        });
    }

    getCategories(): string[] {
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

    clear(){
        this.table.clear();
        this.NameInput.value = "";
        this.DescInput.value = "";
        this.portionsInput.value = "";
        this.recipeList.innerHTML = "";
        this.checkboxes.forEach(element => element.checked = false);
    }
}