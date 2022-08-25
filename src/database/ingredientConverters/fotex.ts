import { Ingredient } from "../../model/Ingredient";
import { Ref } from "../../model/Ref";
import { IFotexIngredient } from "../interfaces/IFotexIngredient";
import { getCalories, getMacro } from "./utils";

export function convertRawFotexItem(item: IFotexIngredient): Ingredient{
    return new Ingredient(
        item.name,
        item.brand || "",
        item.normalPrice / 100,
        item.compareNormalPrice / 100,
        Number(item.salesUnit),
        Array.from((new Set(item.categories.lvl2[0].replace(/( [&<>,\.] )|( m\.v\.)|( og )/g, ";").split(";"))).values()),
        new Ref("Fotex", Number(item.articleID)),
        Number(getCalories(item.nutritionPer100g, "Energi").split("/")[0]),
        getMacro(item.nutritionPer100g, "Fedt"),
        getMacro(item.nutritionPer100g, "Kulhydrater"),
        getMacro(item.nutritionPer100g, "Protein")
    )
}