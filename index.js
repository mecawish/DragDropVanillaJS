const addTextBox = document.getElementById("addBtn");
const dropZone = document.getElementById("dropZone");

const dropZoneStyle = window.getComputedStyle(dropZone);
const marginTop = parseInt(dropZoneStyle.getPropertyValue("border-top-width"));
const marginBottom = parseInt(
  dropZoneStyle.getPropertyValue("border-bottom-width")
);
const marginLeft = parseInt(
  dropZoneStyle.getPropertyValue("border-left-width")
);
const marginRight = parseInt(
  dropZoneStyle.getPropertyValue("border-right-width")
);

const dropZoneRightLimit =
  dropZone.offsetWidth + dropZone.offsetLeft - marginRight;
const dropZoneLeftLimit = dropZone.offsetLeft + marginLeft;
const dropZoneTopLimit = dropZone.offsetTop + marginTop;
const dropZoneBottomLimit =
  dropZone.offsetHeight + dropZone.offsetTop - marginBottom;

let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;
let dragElement = null;

document.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

addTextBox.onclick = () => {
  let textBox = document.createElement("div");
  let inputTextBox = document.createElement("div");
  let deleteButton = document.createElement("div");

  textBox.classList.add("drag");
  inputTextBox.classList.add("editText");
  deleteButton.classList.add("close");
  deleteButton.textContent = "x";
  deleteButton.addEventListener("click", deleteBox);
  dropZone.append(textBox);
  textBox.append(inputTextBox);
  textBox.append(deleteButton);
  makeEditable(inputTextBox);
};

function onMouseDown(e) {
  if (e.target.classList.contains("drag")) {
    startX = e.pageX;
    startY = e.pageY;
    dragElement = e.target;
    dragElement.style.cursor = "move";
    dragElement.firstChild.setAttribute("contenteditable", false);
    offsetX = dragElement.offsetLeft;
    offsetY = dragElement.offsetTop;
  }
}

function onMouseMove(e) {
  if (dragElement) {
    let newLeft = offsetX + e.pageX - startX;
    let newTop = offsetY + e.pageY - startY;
    let rightLimit = dropZoneRightLimit - dragElement.offsetWidth;
    let bottomLimit = dropZoneBottomLimit - dragElement.offsetHeight;

    if (newLeft > rightLimit) {
      dragElement.style.left = rightLimit + "px";
    } else if (newLeft < dropZoneLeftLimit) {
      dragElement.style.left = dropZoneLeftLimit + "px";
    } else {
      dragElement.style.left = newLeft + "px";
    }

    if (newTop > bottomLimit) {
      dragElement.style.top = bottomLimit + "px";
    } else if (newTop < dropZoneTopLimit) {
      dragElement.style.top = dropZoneTopLimit + "px";
    } else {
      dragElement.style.top = newTop + "px";
    }
  }
}

function onMouseUp(e) {
  if (dragElement) {
    makeEditable(dragElement.firstChild);
    dragElement.style.cursor = "default";
    dragElement = null;
  }
}

function makeEditable(el) {
  el.setAttribute("contenteditable", true);
  el.spellcheck = false;
  el.style.cursor = "text";
}

function deleteBox(e) {
  e.target.parentNode.remove();
}
