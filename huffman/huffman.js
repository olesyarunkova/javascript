function alph(text){
    return text.split("").reduce((fs, c) =>
        fs[c] ? (fs[c] += 1, fs)
            : (fs[c] = 1, fs), {})
}

function sorted(text) {
    return text.sort((a, b) => a[1] - b[1]);
}

function tree(text) {
    if (text.length >= 2) {
        let node = [[text.slice(0, 2), text[0][1] + text[1][1]]]
        return tree(sorted(node.concat(text.slice(2))));
    }
    return text[0]
}

function codeTable(tree, pfx = "") {
    if (tree[0] instanceof Array) {
        return Object.assign(codeTable(tree[0][0], pfx + "0"), codeTable(tree[0][1], pfx + "1"))
    }
    return {[tree[0]]: pfx};
}

function encode(codeTable,strEncode = ""){
    for(let i in input){
        strEncode += codeTable[input[i]]
    }
    return strEncode
}

function decode(codeTable,strEncode,n=0,strDecode = ""){
    let array = Object.values(codeTable).map(c => c)
    for(let i=1;i <= strEncode.length;i++){
        let value = strEncode.slice(n,i)
        if (array.indexOf(value) !== -1){
            n = i
            strDecode+=Object.keys(codeTable).find(key => codeTable[key] === value)
        }
    }
    return strDecode
}

const fs = require("fs");
input = fs.readFileSync(process.argv[2], "utf-8");

alphFreq = alph(input)
alphFreq = sorted(Object.entries(alphFreq).map(c => c));
console.log("character frequency:", alphFreq,"\n")

charCodes = codeTable(tree(alphFreq));
if (Object.keys(charCodes).length === 1){
    for(let i in n){
        charCodes[i]="0";
    }
}
console.log("character encoding:", charCodes,"\n");

strEncode = encode(charCodes);
console.log("encoded:", strEncode,"\n");

console.log("decoded:", decode(charCodes,strEncode),"\n");