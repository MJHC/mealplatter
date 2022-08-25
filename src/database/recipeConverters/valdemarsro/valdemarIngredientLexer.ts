import { Token } from "../../Token";
const UNIT = new RegExp(/^g|kg|ml|^l|tsk|dl|fed|stænger|dåse|håndfuld|spsk|nip/);
const AMONUT = new RegExp(/[0-9]+(\,[0-9]+)?/);
const NUMBER = new RegExp(/[0-9]/);
const INGREDIENT = new RegExp(/[a-zæøåéA-ZÆØÅÉ]+/);
const INSTRUCTIONS = new RegExp(/,.+$/);
const WHITESPACE = new RegExp(/\s+/);

export function convertValdemarIngredient(ingredient: string){
    let tokens = lexer(ingredient);
    console.log(tokens);
}

function lexer(input: string): Token[]{
    let tokens: Token[] = [];
    const EOF = input.length;
    let peek = 0;
    while(peek < EOF){
        if(WHITESPACE.test(input[peek])) peek++;
        let lookAHead = input.substring(peek, peek + 1)
        if(NUMBER.test(lookAHead)){ 
            let lexeme = scanAmount(input, peek);
            pushToken("AMOUNT", lexeme);
            peek += lexeme.length;
        }
        else if(INGREDIENT.test(lookAHead)){
            let lexeme = scanIngredient(input, peek);
            if(lexeme.match(UNIT) != null &&  lexeme.match(UNIT)![0] === lexeme)
                pushToken("UNIT", lexeme);  
            else
                pushToken("INGREDIENT", lexeme);
            peek += lexeme.length;
        }
        else if(/,/.test(lookAHead)){
            let lexeme = scanInstructions(input, peek);
            pushToken("INSTRUCTIONS", lexeme.substring(1).trim());
            peek += lexeme.length;
        } else {
            throw Error("Lexer Error: " + input);
        }
    }

    return tokens;

    function pushToken(type: string, value: string){
        tokens.push(new Token(type, value));
    }
}

function scanAmount(input: string, peek: number){
    let lexeme = "";
    while(NUMBER.test(input[peek])){
        lexeme += input[peek];
        peek++;
        if(input[peek] === ","){
            lexeme += ".";
            while(NUMBER.test(input[++peek]))
                lexeme += input[peek++];
        }
    }
    
    return lexeme;
}

function scanIngredient(input: string, peek: number){
    let lexeme = "";
    while(INGREDIENT.test(input[peek]) && peek < input.length){
        lexeme += input[peek];
        peek++;
    }
    return lexeme;
}

function scanInstructions(input: string, peek: number){
    let lexeme = input.substring(peek);
    if(INSTRUCTIONS.test(lexeme))
        return lexeme;
    else
        throw Error("Instruction Error: " + input);
}