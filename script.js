// STYLING AND APPENDING
let canvasSize = document.createElement("p");
canvasSize.textContent = "16X16";

let color = document.createElement("input");
color.type = "color";
color.setAttribute("id", "colorpicker");
color.value = "#0000ff";
color.style.height = "auto";
color.setAttribute("title", "Color Pallete");

let colorP = document.createElement("p");
colorP.textContent = "(C)";

let colorDiv = document.createElement("div");
colorDiv.style.display = "flex";
colorDiv.style.flexDirection = "column";
colorDiv.style.alignItems = "center";
colorDiv.style.textAlign = "center";
colorDiv.style.justifyContent = "center";

let contain = document.getElementById("container");

contain.style.border = "2px solid black";

let newDiv = document.createElement("div");

newDiv.style.display = "flex";
newDiv.style.flexDirection = "row";
newDiv.style.gap = "1rem";

let center = document.querySelector(".center");

let submit = document.createElement("button");
submit.textContent = "CANVAS SIZE";

let toggle = document.createElement("div");
toggle.innerHTML = "&#11035;";
toggle.style.padding = "0.25rem";
toggle.style.border = "1px solid black";
toggle.style.cursor = "pointer";
toggle.setAttribute("title", "Auto Drag");
toggle.style.backgroundColor = "rgb(255,255,255,0.5)";

let toggleGrid = document.createElement("button");
toggleGrid.style.background =
  'rgba(255, 255, 255, 255) url("./assets/kindpng_7298162.png") repeat scroll 0% 0% / contain';
toggleGrid.style.backgroundSize = "contain";
toggleGrid.style.width = "30px";
toggleGrid.style.padding = "1rem";
toggleGrid.style.border = "solid 1.5px black";
toggleGrid.append(" ");
toggleGrid.setAttribute("title", "Toggle Grid");

let gridP = document.createElement("p");
gridP.textContent = "(G)";

let gridButtonDiv = document.createElement("div");

gridButtonDiv.style.display = "flex";
gridButtonDiv.style.flexDirection = "column";
gridButtonDiv.style.alignItems = "center";
gridButtonDiv.style.textAlign = "center";
gridButtonDiv.style.justifyContent = "center";

let flexDiv = document.createElement("div");

flexDiv.style.display = "flex";
flexDiv.style.flexDirection = "column";
flexDiv.style.alignItems = "center";
flexDiv.style.textAlign = "center";
flexDiv.style.justifyContent = "center";

let toggleP = document.createElement("p");
toggleP.textContent = "(T)";

let shortcutsP = document.createElement("div");
shortcutsP.style.display = "flex";
shortcutsP.style.flexDirection = "column";
shortcutsP.style.alignItems = "center";
shortcutsP.style.textAlign = "-moz-left";
shortcutsP.style.justifyContent = "center";
shortcutsP.innerHTML =
  "SHORTCUTS: " +
  "<pre>" +
  "(T) for toggling between Auto Selection and Single Selection." +
  "<pre>" +
  "(C) for opening the Color Pallete." +
  "<pre>" +
  "(E) for a Quick Erase." +
  "<pre>" +
  "(G) for toggling the grid ON and OFF";

center.insertBefore(canvasSize, center.firstChild);

flexDiv.append(toggle);
flexDiv.append(toggleP);

colorDiv.append(color);
colorDiv.append(colorP);

gridButtonDiv.append(toggleGrid);
gridButtonDiv.append(gridP);

newDiv.append(submit);
newDiv.append(colorDiv);
newDiv.append(flexDiv);
newDiv.append(gridButtonDiv);

center.appendChild(newDiv);
center.appendChild(shortcutsP);

////////////////////////////////////////////////////

let istoggleOn = false; // BOOLEAN VALUE FOR LINE 74

// CREATE GRID
function createGrid(n) {
  contain.innerHTML = `<div class="row">${'<div class="cell"></div>'.repeat(
    n
  )}</div>`.repeat(n);

  checkToggle();
  grid();
}

createGrid(16); // DEFAULT GRID SIZE

submit.addEventListener("click", getInput);

// Change Canvas Size
function getInput() {
  let x = prompt("Enter Canvas Size (1-100): ");

  if (x < 101 && x > 0) {
    while (contain.firstChild) {
      contain.removeChild(contain.firstChild);
    }
    grid();
    createGrid(x);
    canvasSize.textContent = x + "X" + x;
  } else {
    alert("Enter a value between 1 and 100");
  }
}

// Change Between Mouseover and Click To Colorize
function checkToggle() {
  istoggleOn = !istoggleOn;

  if (istoggleOn) toggle.setAttribute("title", "Auto Drag");
  if (!istoggleOn) toggle.setAttribute("title", "Single Select");
  Colorize();
}

// COLORIZE CELLS
function Colorize() {
  let search = document.querySelectorAll(".cell");
  toggle.addEventListener("click", checkToggle);

  search.forEach((element) => {
    element.addEventListener("click", function () {
      if (istoggleOn) element.style.backgroundColor = `${color.value}`;
    });

    element.addEventListener("mouseover", function () {
      if (!istoggleOn) element.style.backgroundColor = `${color.value}`;
    });
  });
}

toggle.append(" "); // display title attribute

document.addEventListener("keypress", function (e) {
  if (e.code === "KeyT") checkToggle();
});

document.addEventListener("keypress", function (e) {
  if (e.code === "KeyE") color.value = "#FFFFFF";
});

document.addEventListener("keypress", function (e) {
  if (e.code === "KeyC") color.click();
});

function grid() {
  let cells = document.querySelectorAll(".cell");
  let isGridOn = false;

  document.addEventListener("keypress", function (e) {
    if (e.code === "KeyG" && !isGridOn) {
      cells.forEach((cell) => (cell.style.border = "1px solid rgb(0,0,0,0.1)"));
      isGridOn = true;
    } else if (e.code === "KeyG" && isGridOn) {
      cells.forEach((cell) => (cell.style.border = "none"));
      isGridOn = false;
    }
  });

  toggleGrid.addEventListener("click", function () {
    if (!isGridOn) {
      cells.forEach((cell) => (cell.style.border = "1px solid rgb(0,0,0,0.1)"));
      setTimeout(() => {
        isGridOn = true;
      }, 500);
    }
    if (isGridOn) {
      cells.forEach((cell) => (cell.style.border = "none"));

      setTimeout(() => {
        isGridOn = false;
      }, 500);
    }
  });
}

///////////////////////////////////////////////////////////////

toggle.addEventListener("mouseover", function () {
  this.style.backgroundColor = "rgb(255,255,255)";
});

toggle.addEventListener("mouseout", function () {
  this.style.backgroundColor = "rgb(255,255,255,0.5)";
});

submit.addEventListener("click", function () {
  istoggleOn = true;
});

toggleGrid.addEventListener("mouseover", function () {
  this.style.backgroundColor = "rgb(255,255,255)";
});

toggleGrid.addEventListener("mouseout", function () {
  this.style.backgroundColor = "rgb(255,255,255,0.5)";
});
