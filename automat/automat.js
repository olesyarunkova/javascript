function automata(string, substring){
    let statistic = {'Time': 0, 'Indices': 0}; // объект
    let indices = [];
    let pointer = 0; // указатель
    let startTime = performance.now(); // запись времени начала

    let len = substring.length;
    let alph = new Array();
    
    for (let i = 0; i < len; i++){ // массив для символов строки(изначально 0)
        alph[substring.charAt(i)]=0;
    }
        
    let del = new Array(len+1); // двумерный массив для переходов
    for (let j = 0; j <= len; j++){
        del[j]=new Array();
    }
        
    for(let i in alph){ // 1-ое состояние для всех символов алф
        del[0][i]=0;
    }
        
    for(let j = 0; j < len; j++){ // создание автомата
        let prev = del[j][substring.charAt(j)]; // предыдущ состояние автомата
        del[j][substring.charAt(j)] = j + 1; // переход к след состоянию
        for(let i in alph){ 
            del[j + 1][i] = del[prev][i];
        }
    }
    
    for(let j = 0; j <= len; j++){
        out = '';
        for(i in alph){
            out += del[j][i] + ' ';
        }          
    }
    
    let state = 0; // подсчет вхождений
    for (let i = 0; i < string.length; i++){
        if (string.charAt(i) in alph){
            state = del[state][string.charAt(i)];
        }            
        else{
            state = 0;
        }            
        if (state == len){
            indices[pointer] = (i-len+1);      
            pointer++;
        }
    }

    statistic['Time'] = performance.now() - startTime;
    statistic['Indices'] = indices;
    return statistic;

}



let argumentsFromConsole = process.argv;
let inputFile = argumentsFromConsole[2];
let codeWord = argumentsFromConsole[3];

try{
    const fs = require('fs');
    let inputFirst = fs.readFileSync(inputFile, 'utf8');
    let string = inputFirst.toString();  
    let inputSecond = fs.readFileSync(codeWord, 'utf8');
    let substring = inputSecond.toString();

    console.log(automata(string, substring));    
    console.log("Выполнение закончилось.")
}
catch(error){
    console.log("Возникла ошибка:");
    console.log(error.message);
}
/*
cd desktop
cd js
cd automat
node automat.js stroka.txt podstroka.txt
*/