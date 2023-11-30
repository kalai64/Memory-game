//! Get Elements
const boxes = document.querySelector(".boxes");
const colors = [
  "aqua",
  "coral",
  "red",
  "blueviolet",
  "chartreuse",
  "gold",
  "hotpink",
  "blue",
];
const colorList = [...colors, ...colors];
// console.log(colorList);
const boxLength = colorList.length;
// console.log(boxLength)

//Initializing the main elements of the game state
let revealTime = 0;
let activeBox = null;
let waitingTime = false;

// function display the boxes
function buildBoxes(color) {
  const element = document.createElement("div");
  element.classList.add("box");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false"); // used to check revealed box

  //adding event listners for click event
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");
    
    //Display boxes and chcking for reveal and current element
    if (waitingTime || revealed === "true" || element === activeBox) {
      return;
    }
    element.style.backgroundColor = color;

    //chcking the active box
    if (!activeBox) {
      activeBox = element;
      return;
    }

    //logic for matching color

    const colorMatch = activeBox.getAttribute("data-color");
    if (colorMatch === color) {
      activeBox.setAttribute("data-revealed", "true");
      element.setAttribute("data-revealed", "true");
      waitingTime = false;
      activeBox = null;
      revealTime += 2;
      if (revealTime === boxLength) {
        alert("Congrats 🤗😎");
      }
      return;
    }

    // change the waiting time to true and using setimeout for transistion
    waitingTime = true;
    setTimeout(() => {
      element.style.backgroundColor = null;
      activeBox.style.backgroundColor = null;
      waitingTime = false;
      activeBox = null;
    }, 1000);
  });

  return element;
}

// Building the boxes for the game
for (let i = 0; i < boxLength; i++) {
  // this is the place the colors random
  const randomIndex = Math.floor(Math.random() * colorList.length);
  const color = colorList[randomIndex];
  const box = buildBoxes(color);

  //using splice method to avoid 3 reapeted
  colorList.splice(randomIndex, 1);

  //console.log(color);
  boxes.append(box);
}
