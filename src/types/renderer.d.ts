import { Ingredient } from "../model/Ingredient";
import { Recipe } from "../model/Recipe";

export interface IElectronAPI {
    getCPUCores: () => number,
    getIngredients: () => string[],
    findIngredient: (name: string) => Ingredient | undefined,
    saveRecipe:(recipe: Recipe) => void,
  }
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}