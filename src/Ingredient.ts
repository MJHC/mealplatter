import { Macro } from "./Macro";

export class Ingredient {
    name: string;
    price: number;
    macros: Macro = new Macro();
    

    constructor(name: string, price:number, calories: number, fat: number, carbohydrates: number, protein: number) {
        this.name = name;
        this.price = price;
        this.macros.calories = calories;
        this.macros.fat = fat;
        this.macros.carbohydrates = carbohydrates;
        this.macros.protein = protein;
    }

    static createSample(name: string){
        return new Ingredient(name, 0, 0, 0, 0, 0);
    }
}