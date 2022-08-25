export function getCalories(nutritionInfo: {name:string, value:string}[], macro: string): string{
    let val = nutritionInfo.find(i => i.name === macro)?.value
    if(!val) return "0";
    return formatMacro(val);
}

export function getMacro(nutritionInfo: {name:string, value:string}[], macro: string){
    let val = nutritionInfo.find(i => i.name === macro)?.value
    if(!val) return 0;
    return Number(formatMacro(val));
}

export function formatMacro(macro:string){
    return macro.replaceAll(/([a-zA-z<>])+\.*|\s+/g, "").replace(",", ".");
}

export function formatString(string:string){
    if(!string) throw "No string";
    return string.toLowerCase().split(" ")
        .map(s => s[0].toUpperCase() + s.substring(1))
        .join(" ");
}