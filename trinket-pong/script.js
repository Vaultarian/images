const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const paddleWidth = 12;
const paddleHeight = 80;
const ballRadius = 8;
const winningScore = 10;

const paddleSpeed = 320; // pixels per second
const baseBallSpeed = 260;

const leftPaddle = {
  x: 20,
  y: canvas.height / 2 - paddleHeight / 2,
  dy: 0,
  score: 0
};

const rightPaddle = {
  x: canvas.width - 20 - paddleWidth,
  y: canvas.height / 2 - paddleHeight / 2,
  dy: 0,
  score: 0
};

const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: baseBallSpeed,
  vy: baseBallSpeed * 0.75
};

let isPaused = false;
let lastTime = 0;

function randomDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

function resetBall(direction = randomDirection()) {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  const angle = (Math.random() * 0.6 - 0.3) * Math.PI;
  const speed = baseBallSpeed;
  ball.vx = Math.cos(angle) * speed * direction;
  ball.vy = Math.sin(angle) * speed;
}

function drawNet() {
  ctx.fillStyle = '#fff';
  const segmentHeight = 20;
  for (let y = 0; y < canvas.height; y += segmentHeight * 2) {
    ctx.fillRect(canvas.width / 2 - 2, y, 4, segmentHeight);
  }
}

function drawPaddle(paddle) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(paddle.x, paddle.y, paddleWidth, paddleHeight);
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '24px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fff';
  ctx.fillText(leftPaddle.score, canvas.width / 4, 40);
  ctx.fillText(rightPaddle.score, (canvas.width / 4) * 3, 40);
}

function drawWinner(text) {
  ctx.font = '36px monospace';
  ctx.fillStyle = '#0f0';
  ctx.textAlign = 'center';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  ctx.font = '18px monospace';
  ctx.fillStyle = '#fff';
  ctx.fillText('Press Space to Restart', canvas.width / 2, canvas.height / 2 + 40);
}

function updatePaddle(paddle, deltaTime) {
  paddle.y += paddle.dy * deltaTime;
  if (paddle.y < 0) {
    paddle.y = 0;
  } else if (paddle.y + paddleHeight > canvas.height) {
    paddle.y = canvas.height - paddleHeight;
  }
}

function updateBall(deltaTime) {
  ball.x += ball.vx * deltaTime;
  ball.y += ball.vy * deltaTime;

  if (ball.y - ballRadius < 0 || ball.y + ballRadius > canvas.height) {
    ball.vy *= -1;
    ball.y = Math.max(ballRadius, Math.min(canvas.height - ballRadius, ball.y));
  }

  if (
    ball.x - ballRadius < leftPaddle.x + paddleWidth &&
    ball.y > leftPaddle.y &&
    ball.y < leftPaddle.y + paddleHeight
  ) {
    ball.vx = Math.abs(ball.vx) + 12;
    const offset = (ball.y - (leftPaddle.y + paddleHeight / 2)) / (paddleHeight / 2);
    ball.vy = offset * Math.abs(ball.vx);
    ball.x = leftPaddle.x + paddleWidth + ballRadius;
  }

  if (
    ball.x + ballRadius > rightPaddle.x &&
    ball.y > rightPaddle.y &&
    ball.y < rightPaddle.y + paddleHeight
  ) {
    ball.vx = -Math.abs(ball.vx) - 12;
    const offset = (ball.y - (rightPaddle.y + paddleHeight / 2)) / (paddleHeight / 2);
    ball.vy = offset * Math.abs(ball.vx);
    ball.x = rightPaddle.x - ballRadius;
  }

  if (ball.x + ballRadius < 0) {
    rightPaddle.score += 1;
    checkWin();
    resetBall(1);
  } else if (ball.x - ballRadius > canvas.width) {
    leftPaddle.score += 1;
    checkWin();
    resetBall(-1);
  }
}

function checkWin() {
  if (leftPaddle.score >= winningScore || rightPaddle.score >= winningScore) {
    isPaused = true;
  }
}

function update(deltaTime) {
  if (isPaused) {
    return;
  }

  updatePaddle(leftPaddle, deltaTime);
  updatePaddle(rightPaddle, deltaTime);
  updateBall(deltaTime);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNet();
  drawPaddle(leftPaddle);
  drawPaddle(rightPaddle);
  drawBall();
  drawScore();

  if (isPaused) {
    const winner = leftPaddle.score >= winningScore ? 'Left Player Wins!' : 'Right Player Wins!';
    drawWinner(winner);
  }
}

function loop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  update(deltaTime);
  draw();

  requestAnimationFrame(loop);
}

function handleKeyDown(event) {
  let handled = true;

  switch (event.key) {
    case 'w':
    case 'W':
      leftPaddle.dy = -paddleSpeed;
      break;
    case 's':
    case 'S':
      leftPaddle.dy = paddleSpeed;
      break;
    case 'ArrowUp':
      rightPaddle.dy = -paddleSpeed;
      break;
    case 'ArrowDown':
      rightPaddle.dy = paddleSpeed;
      break;
    case ' ':
      if (isPaused) {
        restartGame();
      }
      break;
    default:
      handled = false;
  }

  if (handled) {
    event.preventDefault();
  }
}

function handleKeyUp(event) {
  switch (event.key) {
    case 'w':
    case 'W':
      if (leftPaddle.dy < 0) {
        leftPaddle.dy = 0;
      }
      break;
    case 's':
    case 'S':
      if (leftPaddle.dy > 0) {
        leftPaddle.dy = 0;
      }
      break;
    case 'ArrowUp':
      if (rightPaddle.dy < 0) {
        rightPaddle.dy = 0;
      }
      break;
    case 'ArrowDown':
      if (rightPaddle.dy > 0) {
        rightPaddle.dy = 0;
      }
      break;
  }
}

function restartGame() {
  leftPaddle.score = 0;
  rightPaddle.score = 0;
  isPaused = false;
  resetBall();
}

resetBall();
requestAnimationFrame(loop);

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
