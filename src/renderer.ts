const table = new IngredientTable("ingredients", window.electronAPI.getIngredients());

const addIngredient = document.getElementById("add-ingredient") as HTMLButtonElement;

addIngredient.addEventListener("click", () => {
    table.addRow();
});


