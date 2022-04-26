class IngredientTable{
    table: HTMLTableElement;
    ingredients: string[] = [];
    suggestionBox: HTMLDivElement = document.getElementById("result") as HTMLDivElement;

    constructor(table: string, ingredients: string[]){
        this.table = document.getElementById(table) as HTMLTableElement;
        this.ingredients = ingredients;
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
        const deleteButton = row.insertCell(4);
        const ingredientNameInput = this.createInput("ingredientName", "text");

        setEventListenersOnSearch(ingredientNameInput, this.ingredients, this.suggestionBox);

        ingredientName.appendChild(ingredientNameInput);
        ingredientAmount.appendChild(this.createInput("amount", "number"));
        ingredientUnit.appendChild(this.createSelect(["g", "kg", "ml", "l"]));

        const priceInput = this.createInput("price", "number");
        priceInput.setAttribute("disabled", "true");
        ingredientPrice.appendChild(priceInput);

        const btn = this.createButton("Delete");
        btn.addEventListener("click", () => {
            this.table.deleteRow(row.rowIndex);
        });
        deleteButton.appendChild(btn);
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