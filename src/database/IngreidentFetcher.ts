import fs from 'fs';
import path from 'path';
import { Ingredient } from '../model/Ingredient';
import { Ref } from '../model/Ref';
import { DataCollection } from './DataCollection';

export class IngredientFetcher{
    private urls: string[];

    constructor(urls: string[]){
        this.urls = urls;
    }

    fetchFromFile(filePath: string, refName: string, venderConverter: Function, predicate: Function): DataCollection<Ingredient>{
        let absPath = path.join(__dirname, filePath);
        let json = fs.readFileSync(absPath).toString()
        let data = this.convertIngredients(json, refName, venderConverter, predicate);
        return data;
    }
    private convertIngredients(data: string, refName: string, callback: Function, arrow: Function){
        const food = JSON.parse(data).filter(arrow);
        let ingredients = [];
        let errors = [];
        for(let i = 0; i < food.length; i++){
            try{
            ingredients.push(callback(food[i]));
            }
            catch(e){
                if ("articleID" in food[i])
                    errors.push(new Ref(refName, food[i]["articleID"]));
                if ("id" in food[i])
                    errors.push(new Ref(refName, food[i]["id"]));
            }
        }
        return new DataCollection<Ingredient>(ingredients, errors);
    }

    //fetch: Fetch from algolia 
}

