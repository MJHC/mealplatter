import axios from 'axios';
import { Recipe } from './Recipe';
import dotenv from 'dotenv';
dotenv.config();


export class APIReader{
    static async TheMealDBReader(){
        const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = res.data;
        
    }

    static async calorieNinjaReader(food:string){
        const res = await axios.get("https://api.calorieninjas.com/v1/nutrition?query=" + food, {headers: {'X-Api-Key': process.env.API_KEY!}});
        const data = res.data;
        console.log(data)
    }
}