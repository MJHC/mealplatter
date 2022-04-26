import * as excel from 'exceljs';
import fs from 'fs';
import { Ingredient } from './Ingredient';
export class ExcelReader{
    static read(){
        const ingredients: Ingredient[] = [];
        const workbook = new excel.Workbook();
        workbook.xlsx.readFile('./ingredients.xlsx').then(() => {
            const worksheet = workbook.getWorksheet("Frida_20190802");
            worksheet.eachRow({includeEmpty: true}, (row, rowNumber) => {
                const ingredient = new Ingredient(
                    `${row.getCell(3).value}`,
                    `${row.getCell(2).value}`,
                    0,
                    Number(`${row.getCell(6).value}`),
                    Number(`${row.getCell(16).value}`),
                    Number(`${row.getCell(13).value}`),
                    Number(`${row.getCell(10).value}`),
                )

                ingredients.push(ingredient);
            });
            ingredients.sort((a, b) => a.category.localeCompare(b.category));
            console.log(ingredients.length);
            const json = JSON.stringify(ingredients);
            fs.writeFileSync('./ingredients.json', json);
        });
    }
}