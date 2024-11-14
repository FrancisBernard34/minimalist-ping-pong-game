const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let paddle1Y = (canvas.height - paddleHeight) / 2;
let paddle2Y = (canvas.height - paddleHeight) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 2;
let ballSpeedY = 2;

const paddleSpeed = 5;
let paddle1Up = false;
let paddle1Down = false;
let paddle2Up = false;
let paddle2Down = false;

let player1Score = 0;
let player2Score = 0;
const winningScore = 10;

function drawPaddle(x, y) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
}

function drawScores() {
    ctx.font = '48px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText(player1Score, canvas.width / 4, 50);
    ctx.fillText(player2Score, 3 * canvas.width / 4, 50);
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < paddleWidth) {
        if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player2Score++;
            resetBall();
        }
    }

    if (ballX + ballRadius > canvas.width - paddleWidth) {
        if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            player1Score++;
            resetBall();
        }
    }

    if (player1Score >= winningScore || player2Score >= winningScore) {
        alert(`Player ${player1Score >= winningScore ? '1' : '2'} wins!`);
        document.location.reload();
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function updatePaddles() {
    if (paddle1Up && paddle1Y > 0) {
        paddle1Y -= paddleSpeed;
    }
    if (paddle1Down && paddle1Y < canvas.height - paddleHeight) {
        paddle1Y += paddleSpeed;
    }
    if (paddle2Up && paddle2Y > 0) {
        paddle2Y -= paddleSpeed;
    }
    if (paddle2Down && paddle2Y < canvas.height - paddleHeight) {
        paddle2Y += paddleSpeed;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, paddle1Y);
    drawPaddle(canvas.width - paddleWidth, paddle2Y);
    drawBall();
    drawScores();
    moveBall();
    updatePaddles();
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') {
        paddle1Up = true;
    } else if (e.key === 's') {
        paddle1Down = true;
    } else if (e.key === 'ArrowUp') {
        paddle2Up = true;
    } else if (e.key === 'ArrowDown') {
        paddle2Down = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') {
        paddle1Up = false;
    } else if (e.key === 's') {
        paddle1Down = false;
    } else if (e.key === 'ArrowUp') {
        paddle2Up = false;
    } else if (e.key === 'ArrowDown') {
        paddle2Down = false;
    }
});

draw();
