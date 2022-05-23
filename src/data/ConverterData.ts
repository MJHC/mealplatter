import { Ingredient } from "../model/Ingredient";

export class ConverterData{
    converted: Ingredient[] = [];
    errors: string[] = [];
    
    constructor(converted: Ingredient[], errors: string[]){
        this.converted = converted;
        this.errors = errors;
    }
}