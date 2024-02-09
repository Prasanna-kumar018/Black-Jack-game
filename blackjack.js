var closesound = false;
let counter = 0;
var myaudios = new Audio("./audios/audio.mp3");
var gameaudio = new Audio("btn.mp4");
let amountEl = document.getElementById("amount");
let inputvalEl = document.querySelector(".input-range");
let incPEl = document.getElementById("incP");
let incMEl = document.getElementById("incM");
let closebtn = document.getElementById("icon");
let incPElementinsideval = document.getElementById("value");
let newgameEl = document.getElementById("newgame");
let gamebtnEl = document.querySelectorAll(".game");
let introEl = document.querySelector(".intro");
let mainpopup = document.getElementsByClassName("mainpopup")[0];
let cardsgrid = document.getElementById("Cards-grid");
let newcard = document.getElementById("newcard");
let cardsrow = document.getElementById("card");
let sumvalue = document.getElementById("sum");
let result = document.getElementById("result");
let bet = document.getElementById("bet");
let blackamount = document.getElementById("blackamount");
let blacknewgame = document.getElementById("blacknewgame");
let endgame = document.getElementById("endgame");
let gemvalue = document.getElementById("gem-val2");
let sumval = 0;
let newgamebool = true;
let newcardbool = false;
let opensound = new Audio("./audios/windowopensound.mp3");
let betbool = true;
let animatestart = false;
let erroraudio = new Audio("./audios/error.mp3");
let squash = new Audio("./audios/SQUASHING.mp3");
let clickaudio = new Audio("./audios/click.mp3");
let flip = new Audio("./audios/flip.mp3");
let flip2 = new Audio("./audios/flip2.mp3");
let increase = new Audio("./audios/increase.mp3");
let decrease = new Audio("./audios/decrease.mp3");
let winner = new Audio("./audios/win.mp3");
let lose = new Audio("./audios/lose.mp3");
bet.addEventListener("click", start);
function start() {
  if (betbool) {
    closesound = true;
    clickaudio.play();
    let string = blackamount.innerText;
    let sumvalues = Number(string.replace("$", ""));
    sumvalues -= Number(incPElementinsideval.innerText);
    if (sumvalues < 0) {
      alert("YOU DON'T HAVE ENOUGH MONEY TO BET");
      return;
    }
    blackamount.innerText = "$" + sumvalues;
    gemvalue.innerText = sumvalues;
    newcardbool = true;
    betbool = !betbool;
    counter = 0;
  } else {
    erroraudio.play();
    erroraudio.playbackRate = 2;
    alert("YOU HAVE ALREADY BET THE AMOUNT");
  }
}
closebtn.addEventListener("click", () => {
  if (closesound === false) {
    erroraudio.play();
    alert("YOU CAN'T CLOSE WITHOUT BETTING");
  } else {
    clickaudio.play();
    mainpopup.classList.add("intro-scale");
    opensound.play();
    opensound.playbackRate = 3.5;
    mainpopup.addEventListener("animationend", () => {
      mainpopup.classList.remove("intro-scale");
      mainpopup.style.display = "none";
    });
    closesound = false;
  }
});

function win() {
  let string = blackamount.innerText;
  let sumvalues = Number(string.replace("$", ""));
  sumvalues += 2 * Number(incPElementinsideval.innerText);
  blackamount.innerText = "$" + sumvalues;
  gemvalue.innerText = sumvalues;
}
endgame.addEventListener("click", introdisplay);
function introdisplay() {
  introEl.style.display = "block";
  squash.play();
  introEl.classList.add("intro-scalereverse");
  introEl.addEventListener("animationend", () => {
    introEl.classList.remove("intro-scalereverse");
  });
}
blacknewgame.addEventListener("click", mainpopupdisplay);
function mainpopupdisplay() {
  if (newgamebool === true) {
    mainpopup.style.display = "flex";
    mainpopup.classList.add("intro-scalereverse");
    opensound.play();
    opensound.playbackRate = 3.5;
    mainpopup.addEventListener("animationend", () => {
      mainpopup.classList.remove("intro-scalereverse");
      mainpopup.style.display = "flex";
    });
    newcard.style.display = "block";
    newgamebool = !newgamebool;
  } else {
    erroraudio.play();
    erroraudio.playbackRate = 2;
    alert("YOU CAN'T BET NOW.IF YOU WANT TO BET QUIT THE GAME.");
  }
}
inputvalEl.addEventListener("change", function abc() {
  incPElementinsideval.innerText = inputvalEl.value;
});

function rotatecard(event) {
  if (animatestart === false) {
    let cardinput = "";
    let el = event.target.parentElement;
    console.log(el);
    flip.play();
    flip.playbackRate = 1;
    flip2.play();
    flip2.playbackRate = 0.4;
    el.style.setProperty("animation-name", "shake");
    el.style.setProperty("animation-duration", "5s");
    el.style.setProperty("animation-timing-function", "ease-in");
    el.style.setProperty("animation-fill-mode", "forwards");
    el.addEventListener("animationstart", () => {
      animatestart = true;
    });

    return new Promise((resolve, reject) => {
      el.addEventListener("animationend", () => {
        resolve("yes");
      });
    }).then(() => {
      animatestart = false;
      counter++;
      cardsgrid.style.display = "none";
      cardinput = event.target.parentElement.id;
      console.log(cardinput);
      event.target.parentElement.style.display = "none";
      let cardval = 0;
      let cardnumber = 0;
      cardnumber = parseInt(cardinput.replace("g", ""));
      if (cardnumber >= 11 && cardnumber <= 13) cardval = 10;
      else if (cardnumber == 1 || cardnumber == 11) cardval = 1;
      else cardval = cardnumber;

      sumval += cardval;
      cardsrow.innerText += `- ${cardval} `;
      sumvalue.innerText = `${sumval}`;
      console.log(counter);
      if (counter === 3) {
        reload(parseInt(sumvalue.innerText));
      }
    });
    function reload(sumvalues) {
      if (sumvalues === 21) {
        winner.play();
        result.innerText = "YOU WIN!";
        result.style.display = "flex";
        win();
        newcard.style.display = "none";
      } else {
        lose.play();
        result.innerText = "YOU LOSE!";
        result.style.display = "flex";
        newcard.style.display = "none";
      }
      document.body.addEventListener("pointerdown", (e) => {
        result.style.display = "none";
      });
      newgamebool = true;
      newcardbool = true;
      counter = 0;
      betbool = true;
      sumval = 0;
      cardsrow.innerText = "";
      sumvalue.innerText = String(sumval);
      for (let i = 0; i < cardsgrid.childElementCount; i++) {
        let el = document.getElementById(`g${i + 1}`);
        el.style.display = "block";
        el.style.setProperty("animation-name", "");
      }
    }
  }
}

newcard.addEventListener("click", opencards);
function opencards() {
  if (newcardbool) {
    clickaudio.play();
    cardsgrid.style.display = "grid";
    // cards animation----------------
    shuffle();
  } else {
    erroraudio.play();
    erroraudio.playbackRate = 2;
    alert("FIRST BET THE AMOUNT BY CLICKING NEW GAME");
  }
}
function shuffle() {
  for (let i = 1; i <= 13; i++) {
    let j = Math.floor(Math.random() * (13 - 1 + 1)) + 1;
    let element1 = document.getElementById(`g${i}`);
    let element = document.getElementById(`g${j}`);
    cardsgrid.insertBefore(element, element1);
  }
}
incPEl.addEventListener("click", function abc() {
  let num = Number(incPElementinsideval.innerText) + 5;
  num = num > 100 ? 100 : num;
  increase.play();
  increase.playbackRate = 3;
  inputvalEl.value = num;
  incPElementinsideval.innerText = JSON.stringify(num);
});
incMEl.addEventListener("click", () => {
  let numb = Number(incPElementinsideval.innerText) - 5;
  numb = numb <= 20 ? 20 : numb;
  decrease.play();
  decrease.playbackRate = 10;
  inputvalEl.value = numb;
  incPElementinsideval.innerText = JSON.stringify(numb);
  console.log(incPElementinsideval.textContent);
});

function introdisplayoff() {
  introEl.classList.add("intro-scale");
  squash.play();
  setTimeout(() => {
    introEl.classList.remove("intro-scale");
    introEl.style.display = "none";
  }, 500);
}
gamebtnEl.forEach((ele) => {
  ele.addEventListener("click", () => {
    console.log("gel");
    ele.classList.add("gamebtn");
    gameaudio.play();
    gameaudio.playbackRate = 2;
    ele.addEventListener("animationend", () => {
      ele.classList.remove("gamebtn");
      if (ele.id === "newgame") {
        introdisplayoff();
      }
    });
  });
});
