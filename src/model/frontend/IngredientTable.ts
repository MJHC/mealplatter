import { RecipeIngredient } from "../RecipeIngredient";
import * as elem from "./Elementor";

export class IngredientTable{
    table: HTMLTableElement;
    ingredients: string[] = window.electronAPI.getIngredients();;
    recipeIngredients: Map<string, RecipeIngredient> = new Map();
    static ingredientCount: number = 0;
    suggestionBox: HTMLDivElement = document.getElementById("result") as HTMLDivElement;

    constructor(table: string){
        this.table = document.getElementById(table) as HTMLTableElement;
        this.addTitleRow();
        this.addRow();
    }
    
    addTitleRow(){
        const row = this.table.insertRow(-1);
        row.insertCell(0).innerText = "Ingredient";
        row.insertCell(1).innerText = "Amount";
        row.insertCell(2).innerText = "Unit";
        row.insertCell(3).innerText = "Price";
    }

    addRow(){
        const row = this.table.insertRow(-1);
        const ingredientName = row.insertCell(0);
        const ingredientAmount = row.insertCell(1);
        const ingredientUnit = row.insertCell(2);
        const ingredientPrice = row.insertCell(3);
        const updateButton = row.insertCell(4);
        const deleteButton = row.insertCell(5);
        const nameInput = elem.createInput("ingredientName", "text");
        const amountInput = elem.createInput("amount", "number");
        const unitSelect = elem.createSelect(["g", "kg", "ml", "l", "tsp", "tbsp"]);

        setEventListenersOnSearch(nameInput, this.ingredients, this.suggestionBox);

        amountInput.addEventListener("input", () =>update(nameInput, amountInput, unitSelect, this.recipeIngredients));
        unitSelect.addEventListener("input", () =>update(nameInput, amountInput, unitSelect, this.recipeIngredients));

        nameInput.id = String(IngredientTable.ingredientCount);
        amountInput.id  = String(IngredientTable.ingredientCount);
        unitSelect.id = String(IngredientTable.ingredientCount);


        ingredientName.appendChild(nameInput);
        ingredientAmount.appendChild(amountInput);
        ingredientUnit.appendChild(unitSelect);

        const priceInput = elem.createInput("price", "number");
        priceInput.setAttribute("disabled", "true");
        ingredientPrice.appendChild(priceInput);

        const updateBtn = elem.createButton("Update");
        updateBtn.addEventListener("click", () => {
            
        });

        
        const deleteBtn = elem.createButton("Delete");
        deleteBtn.addEventListener("click", () => {
            this.table.deleteRow(row.rowIndex);
            this.recipeIngredients.delete(nameInput.id);
            IngredientTable.ingredientCount--;
        });
        deleteButton.appendChild(deleteBtn);
        IngredientTable.ingredientCount++
        return row;
    }

    clear(){
        this.table.innerHTML = "";
        this.addTitleRow();
        this.addRow();
    }
}

function update(nameInput: HTMLInputElement, amountInput: HTMLInputElement, unitSelect: HTMLSelectElement, recipeIngredients: Map<string, RecipeIngredient>){
    const ingredient = window.electronAPI.findIngredient(nameInput.value);

        if(ingredient === undefined) return;

        const recipeIngredient = new RecipeIngredient(ingredient, Number(amountInput.value), unitSelect.value);
        recipeIngredients.set(nameInput.id, recipeIngredient);
        console.log(ingredient);
}

function setEventListenersOnSearch(searchBox: HTMLInputElement, list: string[], result: HTMLDivElement){
    searchBox.addEventListener("focus", () => { // inserts div after search box
        elem.insertAfter(result, searchBox);
    });


    searchBox.addEventListener("input", (event: Event) => {
        result.style.display = "block";
        const matches = list.filter(i => i.toLowerCase().includes(searchBox.value.toLowerCase()));
        result.innerHTML = "";
        matches.forEach(i => {
            const div = elem.createDiv(i);
            div.style.cursor = "pointer";
            div.addEventListener("click", (event)=>{
                searchBox.value = i;
                result.style.display = "none";
            });
            result.appendChild(div);
        });
    });
}