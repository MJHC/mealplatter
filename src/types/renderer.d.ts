import { Ingredient } from "../model/Ingredient";

export interface IElectronAPI {
    getCPUCores: () => number,
    getIngredients: () => string[],
    findIngredient: (name: string) => Ingredient | undefined,
  }
  
declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}