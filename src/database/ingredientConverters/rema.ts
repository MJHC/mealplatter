import { Ingredient } from "../../model/Ingredient";
import { Ref } from "../../model/Ref";
import { IRemaIngredient } from "../interfaces/IRemaIngredient";
import { formatString, getCalories, getMacro } from "./utils";

export function convertRawRemaItem(item: IRemaIngredient){
    return new Ingredient(
        formatString(item.name),
        formatString(item.hf2),
        item.pricing.normal_price,
        item.pricing.price_per_kilogram,
        Number(item.underline.split(" ")[0]),
        [item.category_name],
        new Ref("Rema", item.id),
        Number(getCalories(item.nutrition_info, "Energi").split("/")[1]),
        getMacro(item.nutrition_info, "Fedt"),
        getMacro(item.nutrition_info, "Kulhydrat"),
        getMacro(item.nutrition_info, "Protein"),
    )
}