class IngredientTable{
    table: HTMLTableElement;
    ingredients: string[] = [];
    static ingredientCount: number = 0;
    suggestionBox: HTMLDivElement = document.getElementById("result") as HTMLDivElement;

    constructor(table: string, ingredients: string[]){
        this.table = document.getElementById(table) as HTMLTableElement;
        this.ingredients = ingredients;
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
        const ingredientNameInput = this.createInput("ingredientName", "text");
        const ingredientAmountInput = this.createInput("amount", "number");
        const ingredientUnitSelect = this.createSelect(["g", "kg", "ml", "l", "tsp", "tbsp"]);

        setEventListenersOnSearch(ingredientNameInput, this.ingredients, this.suggestionBox);

        ingredientNameInput.id = String(IngredientTable.ingredientCount);
        ingredientAmountInput.id  = String(IngredientTable.ingredientCount);
        ingredientUnitSelect.id = String(IngredientTable.ingredientCount++);

        ingredientName.appendChild(ingredientNameInput);
        ingredientAmount.appendChild(ingredientAmountInput);
        ingredientUnit.appendChild(ingredientUnitSelect);

        const priceInput = this.createInput("price", "number");
        priceInput.setAttribute("disabled", "true");
        ingredientPrice.appendChild(priceInput);

        const updateBtn = this.createButton("Update");
        updateButton.appendChild(updateBtn);


        const deleteBtn = this.createButton("Delete");
        deleteBtn.addEventListener("click", () => {
            this.table.deleteRow(row.rowIndex);
            IngredientTable.ingredientCount--;
        });
        deleteButton.appendChild(deleteBtn);
        return row;
    }

    createInput(name: string, type: string){
        const input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.min = "0";
        return input;
    }

    createSelect(list: string[]){
        const select = document.createElement("select");
        list.forEach(i => {
            select.appendChild(this.createOption(i));
        });
        return select;
    }

    createOption(name: string){
        const option = document.createElement("option");
        option.value = name;
        option.innerText = name;
        return option;
    }

    createButton(name:string){
        const button = document.createElement("button");
        button.innerText = name;
        return button;
    }
}

function setEventListenersOnSearch(searchBox: HTMLInputElement, list: string[], result: HTMLDivElement){
    searchBox.addEventListener("focus", () => { // inserts div after search box
        searchBox.parentNode!.insertBefore(result, searchBox.nextSibling);
    });


    searchBox.addEventListener("input", (event: Event) => {
        result.style.display = "block";
        const matches = list.filter(i => i.toLowerCase().includes(searchBox.value.toLowerCase()));
        result.innerHTML = "";
        matches.forEach(i => {
            result.appendChild(createDiv(i, searchBox, result));
        });
    });

    function createDiv(name: string, textbox: HTMLInputElement, result: HTMLDivElement){
        let div = document.createElement("div");
        div.innerHTML = name;
        div.id = name;
        div.style.cursor = "pointer";
        div.addEventListener("click", (event)=>{
            textbox.value = name;
            result.style.display = "none";
        });
        return div;
    }
}