let textArea = document.getElementById("textTa");
let outputText = document.getElementById("out");
let percentText = document.getElementById("percent");

let countWords_cb = document.getElementById("countWords");
let countCharter_cb = document.getElementById("countCharter");
let countCharterWithoutSpace_cb = document.getElementById("countCharterWithoutSpace");
let percent_cb = document.getElementById("percentCB");
let vowels_cb = document.getElementById("vowels");
let consonants_cb = document.getElementById("consonants");
let punctuation_cb = document.getElementById("punctuation");

let charOut = document.createElement("h4");
outputText.after(charOut);

let charWoutSpaceOut = document.createElement("h4");
outputText.after(charWoutSpaceOut);

let countSpace = document.createElement("h4");
outputText.after(countSpace);

let showPercentSymbolsOut = document.createElement("h4");
outputText.after(showPercentSymbolsOut);

let vowelsOut = document.createElement("h4");
outputText.after(vowelsOut);

let consonantsOut = document.createElement("h4");
outputText.after(consonantsOut);

let punctuationOut = document.createElement("h4");
outputText.after(punctuationOut);

textArea.addEventListener('input', analizator);

function analizator(){ // вывовод результатов 
    if(countWords_cb.checked) {
        let countWord = searchWords_filter(textArea.value);
        outputText.innerText = `Кількість слів: ${countWord}`;
    }else{
      outputText.innerText = ``;
    }

    if(countCharter_cb.checked){
        let chartarts = textArea.value.length;
        charOut.innerText = `Кількість символів: ${chartarts}`;
    }else{
      charOut.innerText = ``;
    }

    if(countCharterWithoutSpace_cb.checked) {
        let space = countCharterWithoutSpace_fun(textArea.value)
        countSpace.innerText = `Кількість символів без пробілів: ${space}`
    }else{
        countSpace.innerText = '';
    }

    if(percent_cb.checked) {
        let symbolMap = countSymbolsPercent(textArea.value);
        let resultText = showPercentSymbols(symbolMap, textArea.value.length);
        showPercentSymbolsOut.innerHTML = resultText
    }else{ 
      showPercentSymbolsOut.innerHTML = ''
    }

    if(vowels_cb.checked) {
        let vowelsCounty = vowelsCount(textArea.value);
        vowelsOut.innerText = `Кількість голосних: ${vowelsCounty}`;
    }else{
      vowelsOut.innerText = ``;
    }

    if(consonants_cb.checked){
      let conson = consCount_fun(textArea.value)
      consonantsOut.innerText = `Кількість приголосних: ${conson}`;
    }else{
      consonantsOut.innerText = ``;
    }

    if(punctuation_cb.checked) {
      let punctuation = punctuation_fun(textArea.value)
      punctuationOut.innerText = `Кількість розділових знаків: ${punctuation}`;
    }else{
      punctuationOut.innerText = ``;
    }
}


function vowelsCount(text){// все гласные символы 
    let vowelsCount = 0;
    let vowels = ['а','і','у','е','и','о','є','ю','ї','я'];

    for(ch of text){
        if(vowels.includes(ch))
            vowelsCount++;
    }
    return vowelsCount;
}

function consCount_fun(text){ // все не гласные символы 
  let consCount = 0;
  let cons = ['к','н','г','ш','щ','з','х','ф','в','п', "р",'л','д','ж','ч','с' ,'м' ,'т' ,'б'];

  for(ch of text){
      if(cons.includes(ch))
      consCount++;
  }
  return consCount;
}

function punctuation_fun(text){ // все символы пунктуации 
  let punctuation = 0;
  let punctuation_mas = ['/', '?' , '.' , '<' , '>' , ',' , '(' , ')' , '*' , '^' , '%' , '$' , '@' , '!' ];

  for(ch of text){
      if(punctuation_mas.includes(ch))
      punctuation++;
  }
  return punctuation;
}

function countSymbolsPercent(text){ // проценти символов
    let symbols = new Map();

    for(ch of text) {
        if(!symbols.has(ch))
            symbols.set(ch, 1);
        else
            symbols.set(ch, symbols.get(ch)+1);
    }
    return symbols;
}

function showPercentSymbols(symbols, size){ // проценти символов в виде строки
    let resultText = "";
    for(let ch of symbols.keys()){
        let count = symbols.get(ch);
        let percent = (count / size * 100).toFixed(2);
        resultText += `${ch} кількість : ${count} відсоток: ${percent}% ||| `;
    }

    return resultText;
}

function showPercentSymbolsTable(symbols, size){ // проценти символов в виде таблицы 
    let resultText = "<table border='1'>";
    for(let ch of symbols.keys()){
        let count = symbols.get(ch);
        let percent = (count / size * 100).toFixed(2);

        resultText += "<tr>";

        resultText += `<td>${ch}</td>`;
        resultText += `<td>${count}</td>`;
        resultText += `<td>${percent}%</td>`;

        resultText += "</tr>"
    }
    resultText += "</table>";
    return percentText.innerHTML = resultText;
}



function searchWords_filter(text){
    return text.split(' ').filter(function(el) {return el != '';}).length // все символы
}

function countCharterWithoutSpace_fun(text){ //  символы без пробела
  let space = text.split(' ').length-1

  return space = text.length - space
}