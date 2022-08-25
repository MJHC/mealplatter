import fs from 'fs';
import path from 'path';
import { Ref } from '../model/Ref';

export class Collection<Type>{
    items: Type[];
    errors: Ref[] = [];

    constructor(typeName: string, itemsPath: string, errorsPath: string){
        let itemsAbs = path.join(__dirname, itemsPath);
        let errorsAbs = path.join(__dirname, errorsPath);
        if (!fs.existsSync(itemsAbs))
            fs.writeFileSync(itemsAbs, "[]")
        if (!fs.existsSync(errorsAbs))
            fs.writeFileSync(errorsAbs, "[]")
        const json = fs.readFileSync(itemsAbs, 'utf8');
        const errorsJson = fs.readFileSync(errorsAbs, 'utf8');
        this.items = JSON.parse(json);
        this.errors = JSON.parse(errorsJson);

        if (this.errors.length > 0){
            console.log(`WARNING: ${this.errors.length} ${typeName} errors found in memory!`);
        }
    }
}