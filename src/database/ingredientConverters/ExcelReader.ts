import * as excel from 'exceljs';
import fs from 'fs';
import { Ingredient } from '../../model/Ingredient';
import { Ref } from '../../model/Ref';
class ExcelReader{
    static read(){
        const ingredients: Ingredient[] = [];
        const workbook = new excel.Workbook();
        workbook.xlsx.readFile('./ingredients.xlsx').then(() => {
            const worksheet = workbook.getWorksheet("Frida_20190802");
            worksheet.eachRow({includeEmpty: true}, (row, rowNumber) => {
                const ingredient = new Ingredient(
                    `${row.getCell(3).value}`, // name
                    "unknown", // producer
                    0, // unitPrice
                    0, // priceKg
                    0, // unitAmount
                    [`${row.getCell(2).value}`], // category
                    new Ref("fooddata.dk", 0), // Ref
                    Number(`${row.getCell(6).value}`), // cal
                    Number(`${row.getCell(16).value}`), // fat
                    Number(`${row.getCell(13).value}`), // carb
                    Number(`${row.getCell(10).value}`), // protein
                )

                ingredients.push(ingredient);
            });
            console.log(ingredients.length);
            const json = JSON.stringify(ingredients);
            fs.writeFileSync('./ingredients.json', json);
        });
    }
}

ExcelReader.read();