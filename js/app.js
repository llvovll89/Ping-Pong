// touchEvent

// document.addEventListener("touchstart", (e) => {
//   [...e.changedTouches].forEach((touch) => {
//     userdiv.style.top = `${touch.pageY}px`;
//     userdiv.style.left = `${touch.pageX}px`;
//     // userdiv.className = touch.identifier;
//     console.log(touch);
//   });
// });

// document.addEventListener("touchmove", (e) => {
//   [...e.changedTouches].forEach((touch) => {
//     // userdiv.className = touch.identifier;
//     userdiv.style.top = `${touch.pageY}px`;
//     userdiv.style.left = `${touch.pageX}px`;
//     console.log(touch);
//   });
// });

// document.addEventListener('touchend', e => {
// })

const wrap = document.querySelector(".wrap");
const blockWidth = 100;
const blockHeight = 20;

const userStart = [165, 10];
let currentPosition = userStart;

//Block 생성
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

// 나의 모든 블록
const blocks = [
  new Block(15, 270),
  new Block(75, 270),
  new Block(135, 270),
  new Block(195, 270),
  new Block(255, 270),
  new Block(315, 270),

  new Block(15, 245),
  new Block(75, 245),
  new Block(135, 245),
  new Block(195, 245),
  new Block(255, 245),
  new Block(315, 245),

  new Block(15, 220),
  new Block(75, 220),
  new Block(135, 220),
  new Block(195, 220),
  new Block(255, 220),
  new Block(315, 220),
];

//b모든 블록 그리기
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    // block left,bottom
    let blockMove = block.style;
    blockMove.left = blocks[i].bottomLeft[0] + "px";
    blockMove.bottom = blocks[i].bottomLeft[1] + "px";
    wrap.appendChild(block);
  }
}

addBlocks();

// 사용자
const userdiv = document.createElement("div");
userdiv.classList.add("user");
let userMove = userdiv.style;
drawUser();
wrap.appendChild(userdiv);

// draw the user
function drawUser() {
  // currentPosition[0] 의미는 userstart 의 첫 번째 값 230
  userMove.left = currentPosition[0] + "px";
  userMove.bottom = currentPosition[1] + "px";
}

// 사용자 이동
function moveUser(e) {
  switch (e.key) {
    case "Arrowleft":
      currentPosition[0] -= 10;
      drawUser();
      break;
  }
}

document.addEventListener('click', moveUser);