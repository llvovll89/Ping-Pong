const wrap = document.querySelector(".wrap");
const blockWidth = 50;
const blockHeight = 20;
const ballDiameter = 20;
// wrap - 넓이
const wrapWidth = 370;
const wrapHeight = 300;
let timerId;
let xDirection = -2;
let yDirection = 2;

const userStart = [155, 10];
let currentPosition = userStart;

// ball start
const ballStart = [175, 40];
let ballCurrenPosition = ballStart;

// arrow up & down (e)
const title = document.querySelector(".title");
const text1 = document.createElement("h1");
const text2 = document.createElement("h2");
title.appendChild(text1);
title.appendChild(text2);
let score = 0;
// text1.textContent = 0;

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
  new Block(70, 270),
  new Block(130, 270),
  new Block(190, 270),
  new Block(250, 270),
  new Block(310, 270),

  new Block(15, 245),
  new Block(70, 245),
  new Block(130, 245),
  new Block(190, 245),
  new Block(250, 245),
  new Block(310, 245),

  new Block(15, 220),
  new Block(70, 220),
  new Block(130, 220),
  new Block(190, 220),
  new Block(250, 220),
  new Block(310, 220),
];

// 모든 블록 그리기
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

// ball draw
function drawBall() {
  ballStyle.left = ballCurrenPosition[0] + "px";
  ballStyle.bottom = ballCurrenPosition[1] + "px";
}

// 사용자 이동
function moveUser(e) {
  switch (e.key) {
    //   e.key 이벤트(키보드 방향 이벤트 - > case 옆 방향)
    case "ArrowLeft":
      // if 문 의미 = left값이 10보다 커야댐(wrap 나가는거 방지)
      if (currentPosition[0] > 10) {
        currentPosition[0] -= 20;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < wrapWidth - 70) {
        currentPosition[0] += 20;
        drawUser();
      }
      break;
    case "ArrowUp":
      if (currentPosition[1] < wrapHeight - 40) {
        currentPosition[1] += 10;
        drawUser();
      }
      break;
    case "ArrowDown":
      if (currentPosition[1] > 10) {
        currentPosition[1] -= 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

// add Ball
const ball = document.createElement("div");
ball.classList.add("ball");
let ballStyle = ball.style;
drawBall();
wrap.appendChild(ball);

// move ball
function moveBall() {
  ballCurrenPosition[0] += xDirection;
  ballCurrenPosition[1] += yDirection;
  drawBall();
  checkForCollistions();
}

timerId = setInterval(moveBall, 20);

// 충돌 확인
function checkForCollistions() {
  // check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrenPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrenPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrenPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrenPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      // i , 1번째만큼
      blocks.splice(i, 1);
      changeDirection();
      score++;
      title.innerHTML = score;

      // check for win
      if (blocks.length === 0) {
        swal("축하합니다!", "성공하셨어요!", "success");
        clearInterval(timerId)
        document.removeEventListener('keydown', moveUser);
      }
    }
  }

  // check for wall collisions
  if (
    //   370
    ballCurrenPosition[0] >= wrapWidth - ballDiameter ||
    ballCurrenPosition[1] >= wrapHeight - ballDiameter ||
    ballCurrenPosition[0] <= 0
  ) {
    changeDirection();
  }

  //   check for user collisions
  if (
    ballCurrenPosition[0] > currentPosition[0] &&
    ballCurrenPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrenPosition[1] > currentPosition[1] &&
    ballCurrenPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }

  //   check for game over
  if (ballCurrenPosition[1] <= 0) {
    clearInterval(timerId);
    title.innerHTML = "you Lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}

// block 사라질 시 title 부분 점수
