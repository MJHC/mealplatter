export function createInput(name: string, type: string){
    const input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.min = "0";
    return input;
}

export function createSelect(list: string[]){
    const select = document.createElement("select");
    list.forEach(i => {
        select.appendChild(createOption(i));
    });
    return select;
}

export function createOption(name: string){
    const option = document.createElement("option");
    option.value = name;
    option.innerText = name;
    return option;
}

export function createButton(name:string){
    const button = document.createElement("button");
    button.innerText = name;
    return button;
}

export function createDiv(name: string){
    const div = document.createElement("div");
    div.innerHTML = name;
    return div;
}

export function createLi(name: string){
    const li = document.createElement("li");
    li.innerHTML = name;
    return li;
}

export function createTable(list: string[], name: string){
    const table = document.createElement("table");
    table.id = name;
    table.appendChild(createRow(list));
    return table;
}

export function createRow(list: any[]){
    const row = document.createElement("tr");
    list.forEach(i => {
        const cell = row.insertCell()

        switch(typeof i){
            case "string":
                cell.innerText = i;
                break;
            case "number":
                cell.innerText = String(twoDecimal(i));
                break;
            case "object":
                cell.appendChild(i);
                break;
        }
    });
    return row;
}

export function insertAfter(newNode: Node, referenceNode: Node) {
    referenceNode.parentNode!.insertBefore(newNode, referenceNode.nextSibling);
}

function twoDecimal(num: number){
    return Math.floor(num * 100) / 100;
}