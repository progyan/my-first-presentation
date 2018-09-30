const STRINGS = ["Тимур, Саша и Матвей беседовали за партой. Тут Саша Муравьёв сказал: *Смотрите, как смешно получается: у всех нас первые две буквы фамилии не совпадают с первыми двумя буквами того, что мы принесли в класс!* Тимур поставил на парту свою муравьиную ферму, и согласился с Сашей. =>",
                    "Через примерно 5 минут Матвей с Бобрусом по очереди отошли в туалет. Кого как зовут и кто что принёс, если известно, что мальчики принесли муравьиную ферму, бобра, и игрушки, каждый принёс что-то одно и что у одного из мальчиков фамилия Игнатьев?"];
let strN = 0;
let cursorVisible = true;
let end = true;

/*function startCursor(){
    let cursor = document.getElementById("cursor");
    if(cursorVisible){
        cursor.style.color = "white";
    } else {
        cursor.style.color = "green";
    }
    cursorVisible = !cursorVisible;
}*/

function clear(){
    if(!end)
        return;
    document.getElementById("info").innerHTML = "";
}

function addLetter(letter, info){
    info.innerHTML = info.innerHTML + letter;
}

function print(text){
    let info = document.getElementById("info");
    printPiece(text, info, 90);
}

function printFast(text){
    let info = document.getElementById("info");
    printPiece(text, info, 50);
}


function printPiece(text, info, delay){
    if(!end)
        return;
    document.getElementById("button").classList.add("disabled");
    end = false;
    let piece = 0;
    printMini();
    function printMini(){
        //printPiece(text, info);
        addLetter(text.charAt(piece), info);
        piece++;
        if(piece > text.length){
            document.getElementById("button").classList.remove("disabled");
            end = true;
            return;
        }
        setTimeout(printMini, delay);
    }
}

function handler(){
    clear();               
    //print("Аэрокосмической инженерией занимается инженер аэрокосмических систем.");
    if(STRINGS[strN].length < 200)
        print(STRINGS[strN]);
    else
        printFast(STRINGS[strN]);
    strN++;
    if(strN >= STRINGS.length){
        strN = 0;
    }
}

//setInterval(startCursor, 500);
//print("Аэрокосмическая инженерия - это основное направление в инженерии, которое занимается вопросами развития летательных и космических аппаратов.     Она состоит из двух основных, и дублирующих друг друга ветвей: авиационной техники и астронавтики.");
//print("Папа, помоги исправить ошибку в коде!");
handler();