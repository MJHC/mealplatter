import * as fs from 'fs';
import { Ingredient } from '../model/Ingredient';
import { Ref } from '../model/Ref';
import { ConverterData } from './ConverterData';
import { IFotexIngredient } from './interfaces/IFotexIngredient';
import { IRemaIngredient } from './interfaces/IRemaIngredient';

export function convertFotexIngredients(file:string){
    const food = JSON.parse(fs.readFileSync(file).toString())
        .filter((ingredient: IFotexIngredient) => ingredient.nutritionPer100g !== undefined);
    let converted = [];
    let errors = [];
    for(let i = 0; i < food.length; i++){
        try{
        converted.push(convertRawFotexItem(food[i]));
        }
        catch(e){
            errors.push(food[i].articleID);
        }
    }
    return new ConverterData(converted, errors);
}

export function convertRemaIngredients(file:string){
    const food = JSON.parse(fs.readFileSync(file).toString())
        .filter((ingredient:IRemaIngredient) => ingredient.nutrition_info.length > 0);
    let converted = [];
    let errors = [];
    for(let i = 0; i < food.length; i++){
        try{
        converted.push(convertRawRemaItem(food[i]));
        }
        catch(e){
            errors.push(food[i].id.toString());
        }
    }
    return new ConverterData(converted, errors);
}

export function saveIngredients(filePath: string, data: ConverterData){
    console.log("Errors: " + data.errors.length);
    console.log("Converted: " + data.converted.length);
    fs.writeFileSync(filePath, JSON.stringify(data.converted));
    if(data.errors.length > 0){
        let arr = filePath.split(".");
        fs.writeFileSync(arr[0] + "_errors." + arr[1], JSON.stringify(data.errors));
    }
}

function convertRawFotexItem(item: IFotexIngredient): Ingredient{
    return new Ingredient(
        item.name,
        item.brand || "",
        item.normalPrice / 100,
        item.compareNormalPrice / 100,
        Number(item.salesUnit),
        Array.from((new Set(item.categories.lvl2[0].replace(/( [&<>,\.] )|( m\.v\.)|( og )/g, ";").split(";"))).values()),
        new Ref("Fotex", Number(item.articleID)),
        Number(getFotexCalories(item, "Energi").split("/")[0]),
        getFotexMacro(item, "Fedt"),
        getFotexMacro(item, "Kulhydrater"),
        getFotexMacro(item, "Protein")
    )
}

function getFotexCalories(item: IFotexIngredient, macro: string): string{
    let val = item.nutritionPer100g.find(i => i.name === macro)?.value
    if(!val) return "0";
    return formatMacro(val);
}

function getFotexMacro(item: IFotexIngredient, macro: string): number{
    let val = item.nutritionPer100g.find(i => i.name === macro)?.value
    if(!val) return 0;
    return Number(formatMacro(val));
}

function convertRawRemaItem(item: IRemaIngredient){
    return new Ingredient(
        formatString(item.name),
        formatString(item.hf2),
        item.pricing.normal_price,
        item.pricing.price_per_kilogram,
        Number(item.underline.split(" ")[0]),
        [item.category_name],
        new Ref("Rema", item.id),
        Number(getRemaCalories(item, "Energi").split("/")[1]),
        getRemaMacro(item, "Fedt"),
        getRemaMacro(item, "Kulhydrat"),
        getRemaMacro(item, "Protein"),
    )
}

function getRemaCalories(item: IRemaIngredient, macro: string): string{
    let val = item.nutrition_info.find(i => i.name === macro)?.value
    if(!val) return "0";

    return formatMacro(val);
}

function getRemaMacro(item: IRemaIngredient, macro: string): number{
    let val = item.nutrition_info.find(i => i.name === macro)?.value
    if(!val) return 0;
    return Number(formatMacro(val));
}

function formatMacro(macro:string){
    return macro.replaceAll(/([a-zA-z<>])+\.*|\s+/g, "").replace(",", ".");
}

function formatString(string:string){
    if(!string) throw "No string";
    return string.toLowerCase().split(" ")
        .map(s => s[0].toUpperCase() + s.substring(1))
        .join(" ");
}
