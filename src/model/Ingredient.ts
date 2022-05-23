import { Macro } from "./Macro";
import { Ref } from "./Ref";

export class Ingredient {
    name: string;
    producer: string;
    unitPrice: number;
    priceKg: number;
    unitAmount: number;
    categories: string[];
    ref: Ref;
    macros: Macro = new Macro();
    

    constructor(name: string, producer: string, unitPrice: number, priceKg: number, unitAmount: number, categories: string[], ref: Ref, calories: number, fat: number, carbohydrates: number, protein: number) {
        this.name = name;
        this.producer = producer;
        this.unitPrice = unitPrice;
        this.priceKg = priceKg;
        this.unitAmount = unitAmount;
        this.categories = categories;
        this.ref = ref;
        this.macros.calories = calories;
        this.macros.fat = fat;
        this.macros.carbohydrates = carbohydrates;
        this.macros.protein = protein;
    }


    static createSample(name: string){
        return new Ingredient(name, "", 0, 0, 0, [""], new Ref("sample", 0), 0, 0, 0, 0);
    }

    toString(){
        return `name: ${this.name} price: ${this.priceKg} category: ${this.categories[0]} calories: ${this.macros.calories} fat: ${this.macros.fat} carbohydrates: ${this.macros.carbohydrates} protein: ${this.macros.protein}`;
    }
}