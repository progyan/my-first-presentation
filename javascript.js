const STRINGS = ["Аэрокосмическая инженерия - это основное направление в инженерии, которое занимается вопросами развития летательных и космических аппаратов.     Она состоит из двух основных, и дублирующих друг друга ветвей: авиационной техники и астронавтики.",
                             "Аэрокосмической инженерией занимается инженер аэрокосмических систем."];
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
                printPiece(text, info);
            }

            
            function printPiece(text, info){
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
                    setTimeout(printMini, 90);
                }
            }

            function handler(){
                clear();               
                //print("Аэрокосмической инженерией занимается инженер аэрокосмических систем.");
                print(STRINGS[strN]);
                strN++;
                if(strN >= STRINGS.length){
                    strN = 0;
                }
            }

            //setInterval(startCursor, 500);
            //print("Аэрокосмическая инженерия - это основное направление в инженерии, которое занимается вопросами развития летательных и космических аппаратов.     Она состоит из двух основных, и дублирующих друг друга ветвей: авиационной техники и астронавтики.");
            //print("Папа, помоги исправить ошибку в коде!");
            handler();