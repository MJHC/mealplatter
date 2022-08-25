import { Ref } from "../model/Ref";

export class DataCollection<T>{
    items: T[];
    errors: Ref[] = [];

    constructor(items: T[], errors: Ref[]){
        this.items = items;
        this.errors = errors;
    }
}