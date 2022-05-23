export interface IValdemarRecipe {
    name: string;
    stats: {name: string; value: string}[];
    ingredients: string[];
    instructions: string[];
    url: string;
    image: string;
}