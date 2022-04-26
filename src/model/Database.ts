import dotenv from 'dotenv';
import mysql from 'mysql';
import { Ingredient } from './Ingredient';
import { Recipe } from './Recipe';
dotenv.config();

export class Database{
    private db : mysql.Connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    });

    ingredients: Ingredient[] = [];
    recipes: Recipe[] = [];

    constructor(){
        this.db.connect();
        
        this.loadIngredients();
        console.table(this.ingredients);
    }

    loadIngredients(){
        const sqlQuery = `SELECT name, price, calories, fat, carbohydrates, protein FROM ingredients`;
        this.db.query(sqlQuery, (err, result) => {
            if(err) throw err;
            for(let i = 0; i < result.length; i++){
                this.ingredients.push(new Ingredient(result[i].name, "", result[i].price, result[i].calories, result[i].fat, result[i].carbohydrates, result[i].protein));
            }
        });
    }
}