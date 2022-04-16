import axios from 'axios';
import { Recipe } from './Recipe';

export async function recipeReader() {
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = res.data;
    console.log(data);
}

class RecipeReader{

    async TheMealDBReader(){
        const res = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = res.data;
        
    }
}