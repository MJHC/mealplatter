export interface IFotexIngredient {
    articleID: string;
    name: string;
    brand: string;
    normalPrice: number;
    compareNormalPrice: number;
    salesUnit: string;
    nutritionPer100g: { name: string; value: string }[];
    categories: {lvl2: string[]};
}