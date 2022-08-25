export interface IRemaIngredient {
    id: number;
    name: string;
    hf2: string;
    pricing: { normal_price: number; price_per_kilogram: number; };
    underline: string;
    nutrition_info: { name: string; value: string}[];
    category_name: string;
}