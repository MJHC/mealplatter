export class Ingredient {
    name: string;
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;

    constructor(name: string, calories: number, fat: number, carbohydrates: number, protein: number) {
        this.name = name;
        this.calories = calories;
        this.fat = fat;
        this.carbohydrates = carbohydrates;
        this.protein = protein;
    }

    static createSample(name: string){
        return new Ingredient(name, 0, 0, 0, 0);
    }
}