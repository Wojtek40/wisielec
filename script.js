//global

let nullch = "_ ";
let wd = document.getElementById("word");
let guessed = [];

over = false;

crt = 0;
imgs = ["s0.svg", "s1.svg", "s2.svg", "s3.svg", "s4.svg", "s5.svg", "s6.svg", "s7.svg", "s8.svg", "s9.svg", "s10.svg", "s11.svg"];
let score = document.getElementById("score");
ids = ["a", "aa", "b", "c", "cc", "d", "e", "ee", "f", "g", "h", "i", "j", "k", "l", "ll", "m", "n", "nn", "o", "oo", "p", "r", "s", "ss", "t", "u", "w", "y", "z", "zi", "zz"];
function aEL(ids, word) {
    for (let i = 0; i < ids.length; i++) {
        let lt = document.getElementById(ids[i]);
        lt.addEventListener("click", function () {
            if (over) handleLetters(ids[i], word, true);
            else handleLetters(ids[i], word, false);
            this.removeEventListener("click", arguments.callee);
        });
    }
}

function main() {
    let word = generate();
    word = word.toUpperCase();
    ids = ["a", "aa", "b", "c", "cc", "d", "e", "ee", "f", "g", "h", "i", "j", "k", "l", "ll", "m", "n", "nn", "o", "oo", "p", "r", "s", "ss", "t", "u", "w", "y", "z", "zi", "zz"];
    aEL(ids, word)

    let rpl = document.getElementById("rpl");
    rpl.addEventListener("click", reset);
    write(word);
}


function GetRandInt(max) {
    return Math.round(Math.random() * max)
}

function handleLetters(x, word, won) {
    let y = document.getElementById(x);
    if (word.search(y.innerHTML) == -1) {

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
    if (!won)
        status_gry(word);
}
function clickIDs(ids) {
    for (let i = 0; i < ids.length; i++) {
        let x = document.getElementById(ids[i]);
        x.click();
    }
}
function status_gry(word) {
    if (crt >= 11) {
        wd.style.color = "red"; setTimeout(przegrana(word), 1000)
        over = true;
    };
    if (wd.innerHTML == word) {
        wd.style.color = "green";
        setTimeout(wygrana, 1000);
        over = true;
    }
}
function przegrana(word) {

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
    clickIDs(ids);

    wd.innerHTML = "";
    wd.style = "";
    imgs = ["s0.svg", "s1.svg", "s2.svg", "s3.svg", "s4.svg", "s5.svg", "s6.svg", "s7.svg", "s8.svg", "s9.svg", "s10.svg", "s11.svg"];
    let score = document.getElementById("score");
    score.src = "img/" + imgs[0];


    guessed = [];

    clear(ids);
    over = false;
    crt = 0;

    let word = generate();
    word = word.toUpperCase();
    aEL(ids, word);
    write(word);

    let win = document.getElementById("gover");
    win.style.display = "none";

    let bl = document.getElementById("blur");
    bl.style.display = "none";
}

main();