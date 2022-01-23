//global

let nullch = "_ ";
let wd = document.getElementById("word");
let guessed = [];
let clicked = [];

crt = 0;
imgs = ["s0.svg", "s1.svg", "s2.svg", "s3.svg", "s4.svg", "s5.svg", "s6.svg", "s7.svg", "s8.svg", "s9.svg", "s10.svg", "s11.svg"];
let score = document.getElementById("score");
ids = ["a", "aa", "b", "c", "cc", "d", "e", "ee", "f", "g", "h", "i", "j", "k", "l", "ll", "m", "n", "nn", "o", "oo", "p", "r", "s", "ss", "t", "u", "w", "y", "z", "zi", "zz"];
function aEL(ids, word) {
    for (let i = 0; i < ids.length; i++) {
        let lt = document.getElementById(ids[i]);
        lt.addEventListener("click", function () {
            handleLetters(ids[i], word);
            clicked.push(ids[i]);
            this.removeEventListener("click", arguments.callee);
        });
    }
}

function main() {
    let word = generate();
    word = word.toUpperCase();
    ids = ["a", "aa", "b", "c", "cc", "d", "e", "ee", "f", "g", "h", "i", "j", "k", "l", "ll", "m", "n", "nn", "o", "oo", "p", "r", "s", "ss", "t", "u", "w", "y", "z", "zi", "zz"];
    aEL(ids, word)
    console.log(word);
    let rpl = document.getElementById("rpl");
    rpl.addEventListener("click", reset);
    write(word);
}


function GetRandInt(max) {
    return Math.round(Math.random() * max)
}

function handleLetters(x, word) {
    let y = document.getElementById(x);
    if (word.search(y.innerHTML) == -1) {
        console.log("źle", crt);
        y.style.background = "red"; wrong();
    } else {
        y.style.background = "green";
        for (let i = 0; i < word.length; i++) {
            if (word[i] == y.innerHTML) {
                guessed[i] = y.innerHTML;
                wd.innerHTML = update(guessed);
            }
        }
    }
    status_gry(word);
}

function status_gry(word) {
    if (crt >= 11) {
        wd.style.color = "red"; setTimeout(przegrana(word), 1000)
    };
    if (wd.innerHTML == word) {
        wd.style.color = "green";
        setTimeout(wygrana, 1000)
    }
}
function przegrana(word) {
    console.log("przegrana");
    let win = document.getElementById("gover");
    win.style.display = "flex";

    let tit = document.getElementById("title");
    tit.innerHTML = "Przegrana";

    let msg = document.getElementById("scr");
    msg.innerHTML = "Nie przejmuj się :) Hasło: " + word;

    let bl = document.getElementById("blur");
    bl.style.display = "block";

}
function wygrana() {
    console.log("wygrana");
    let win = document.getElementById("gover");
    let bl = document.getElementById("blur");
    bl.style.display = "block";

    win.style.display = "flex";
    win.style.justifyContent = "center";

    let tit = document.getElementById("title");
    tit.innerHTML = "Wygrana";

    let msg = document.getElementById("scr");
    msg.innerHTML = "Twój wynik: " + (11 - crt) + " (" + crt + " złych odpowiedzi)";
}

function write(word) {
    wd.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        wd.innerHTML += nullch;
        guessed.push("");
    }
}
function update(toUpdate) {
    let ot = "";
    for (let i = 0; i < toUpdate.length; i++) {
        if (toUpdate[i] == "") { ot += nullch } else {
            ot += toUpdate[i];
        }
    }
    console.log(ot);
    return ot;
}

function wrong() {
    crt++;
    if (crt > 11) {

    } else {
        score.src = "img/" + imgs[crt];
    }
}
function generate() {
    return slowa[GetRandInt(slowa.length)];
}

function clear(ids) {
    for (let i = 0; i < ids.length; i++) {
        let x = document.getElementById(ids[i]);
        x.style = "";
    }
}

function reset() {
    wd.innerHTML = "";
    wd.style="";
    crt = 0;
    imgs = ["s0.svg", "s1.svg", "s2.svg", "s3.svg", "s4.svg", "s5.svg", "s6.svg", "s7.svg", "s8.svg", "s9.svg", "s10.svg", "s11.svg"];
    let score = document.getElementById("score");
    score.src = "img/" + imgs[0];
    let word = generate();
    word = word.toUpperCase();
    guessed = [];
    write(word);
    console.log(word);
    ids = ["a", "aa", "b", "c", "cc", "d", "e", "ee", "f", "g", "h", "i", "j", "k", "l", "ll", "m", "n", "nn", "o", "oo", "p", "r", "s", "ss", "t", "u", "w", "y", "z", "zi", "zz"];
    console.log(clicked);
    aEL(clicked, word);
    clear(clicked);

    clicked = [];
    
    let win = document.getElementById("gover");
    win.style.display = "none";

    let bl = document.getElementById("blur");
    bl.style.display = "none";
}

main();