import { Macro } from "./Macro";

export class Ingredient {
    name: string;
    price: number;
    category: string;
    macros: Macro = new Macro();
    

    constructor(name: string, category:string, price:number, calories: number, fat: number, carbohydrates: number, protein: number) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.macros.calories = calories;
        this.macros.fat = fat;
        this.macros.carbohydrates = carbohydrates;
        this.macros.protein = protein;
    }

    static createSample(name: string){
        return new Ingredient(name, "", 0, 0, 0, 0, 0);
    }

    toString(){
        return `name: ${this.name} price: ${this.price} category: ${this.category} calories: ${this.macros.calories} fat: ${this.macros.fat} carbohydrates: ${this.macros.carbohydrates} protein: ${this.macros.protein}`;
    }
}